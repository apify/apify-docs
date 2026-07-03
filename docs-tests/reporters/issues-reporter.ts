import type { Reporter, TestCase, TestResult, FullResult } from '@playwright/test/reporter';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

interface AssertionData {
    id: string;
    kind: string;
    target: string;
    at?: string;
    page_context: string;
    source_quote: string;
    source_line: number;
    source_file: string;
}

interface ObservedCandidates {
    candidate_kind: string;
    candidates: string[];
    suggested_target: string | null;
}

interface Issue {
    id: string;
    kind: string;
    target: string;
    at?: string;
    page_context: string;
    source_file: string;
    source_line: number;
    source_quote: string;
    status: 'failed' | 'timedOut';
    error: string;
    duration_ms: number;
    suggested_target?: string;
    observed_candidates?: { kind: string; values: string[] };
}

interface ReportFile {
    generated_at: string;
    summary: {
        total: number;
        passed: number;
        failed: number;
        skipped: number;
        pass_rate: string;
    };
    issues: Issue[];
}

const OUTPUT_PATH = 'output/issues.json';

export default class IssuesReporter implements Reporter {
    private collected: { test: TestCase; result: TestResult }[] = [];

    onTestEnd(test: TestCase, result: TestResult): void {
        // Only collect doc-derived assertions, not the auth setup project.
        if (!test.location.file.endsWith('from-doc.spec.ts')) return;
        this.collected.push({ test, result });
    }

    async onEnd(_result: FullResult): Promise<void> {
        const passed = this.collected.filter((r) => r.result.status === 'passed').length;
        const failed = this.collected.filter(
            (r) => r.result.status === 'failed' || r.result.status === 'timedOut',
        ).length;
        const skipped = this.collected.filter((r) => r.result.status === 'skipped').length;
        const total = this.collected.length;

        const issues: Issue[] = this.collected
            .filter((r) => r.result.status === 'failed' || r.result.status === 'timedOut')
            .map(({ test, result }) => {
                const data = extractAssertionData(test);
                const observed = extractObservedCandidates(test);
                const issue: Issue = {
                    id: data.id,
                    kind: data.kind,
                    target: data.target,
                    at: data.at,
                    page_context: data.page_context,
                    source_file: data.source_file,
                    source_line: data.source_line,
                    source_quote: data.source_quote,
                    status: result.status as 'failed' | 'timedOut',
                    error: summarizeError(result.error?.message),
                    duration_ms: Math.round(result.duration),
                };
                if (observed?.suggested_target) issue.suggested_target = observed.suggested_target;
                if (observed?.candidates.length) {
                    issue.observed_candidates = { kind: observed.candidate_kind, values: observed.candidates };
                }
                return issue;
            })
            .sort((a, b) => a.source_line - b.source_line);

        const output: ReportFile = {
            generated_at: new Date().toISOString(),
            summary: {
                total,
                passed,
                failed,
                skipped,
                pass_rate: total === 0 ? 'n/a' : `${Math.round((passed / total) * 100)}%`,
            },
            issues,
        };

        mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
        writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2) + '\n');
        // eslint-disable-next-line no-console
        console.log(
            `\nIssues report: ${OUTPUT_PATH} — ${issues.length} issue${issues.length === 1 ? '' : 's'}, ${passed}/${total} passed`,
        );
    }
}

function extractAssertionData(test: TestCase): AssertionData {
    const ann = test.annotations.find((a) => a.type === 'assertion-data');
    if (ann?.description) {
        try {
            return JSON.parse(ann.description) as AssertionData;
        } catch {
            // fall through to placeholder
        }
    }
    return {
        id: test.title,
        kind: 'unknown',
        target: '',
        page_context: '',
        source_quote: '',
        source_line: 0,
        source_file: 'unknown',
    };
}

function extractObservedCandidates(test: TestCase): ObservedCandidates | null {
    const ann = test.annotations.find((a) => a.type === 'observed-candidates');
    if (!ann?.description) return null;
    try {
        return JSON.parse(ann.description) as ObservedCandidates;
    } catch {
        return null;
    }
}

function summarizeError(message: string | undefined): string {
    if (!message) return 'no error message';
    // Strip ANSI escape sequences from Playwright's error output. The escape
    // character is intentional, so silence oxlint's no-control-regex here.
    // eslint-disable-next-line no-control-regex
    const stripped = message.replace(/\x1B\[[0-9;]*[A-Za-z]/g, '');
    const firstLine = stripped.split('\n')[0]!.trim();
    return firstLine.length > 200 ? firstLine.slice(0, 197) + '...' : firstLine;
}
