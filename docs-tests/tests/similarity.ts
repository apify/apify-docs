// Lightweight string-similarity helpers used to suggest a likely replacement
// when an element assertion fails. Deterministic, no deps.

export function suggestReplacement(target: string, candidates: string[]): string | null {
    if (!target || candidates.length === 0) return null;
    const ranked = candidates
        .map((candidate) => ({ candidate, score: similarity(target, candidate) }))
        .sort((a, b) => b.score - a.score);
    const top = ranked[0]!;
    return top.score >= 0.35 ? top.candidate : null;
}

export function similarity(a: string, b: string): number {
    const aLow = a.trim().toLowerCase();
    const bLow = b.trim().toLowerCase();
    if (!aLow || !bLow) return 0;
    if (aLow === bLow) return 1.0;

    // Substring containment (either direction). Common drift: section renamed
    // from "Session information" → "Session" (target contains candidate).
    if (aLow.includes(bLow) || bLow.includes(aLow)) {
        const longer = Math.max(aLow.length, bLow.length);
        const shorter = Math.min(aLow.length, bLow.length);
        return 0.7 + 0.2 * (shorter / longer);
    }

    // Word overlap (Jaccard on whitespace-split tokens).
    const wordsA = new Set(aLow.split(/\s+/));
    const wordsB = new Set(bLow.split(/\s+/));
    const intersection = [...wordsA].filter((w) => wordsB.has(w)).length;
    const union = wordsA.size + wordsB.size - intersection;
    const jaccard = union > 0 ? intersection / union : 0;
    if (jaccard > 0) return 0.4 + 0.4 * jaccard;

    // Levenshtein ratio fallback for typo-level changes.
    const dist = levenshtein(aLow, bLow);
    const maxLen = Math.max(aLow.length, bLow.length);
    return Math.max(0, 1 - dist / maxLen) * 0.5;
}

function levenshtein(a: string, b: string): number {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    const dp: number[][] = Array.from({ length: a.length + 1 }, () => new Array<number>(b.length + 1).fill(0));
    for (let i = 0; i <= a.length; i++) dp[i]![0] = i;
    for (let j = 0; j <= b.length; j++) dp[0]![j] = j;
    for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            dp[i]![j] = Math.min(dp[i - 1]![j]! + 1, dp[i]![j - 1]! + 1, dp[i - 1]![j - 1]! + cost);
        }
    }
    return dp[a.length]![b.length]!;
}
