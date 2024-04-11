import { Actor, ApifyClient, log } from 'apify';

interface Input {
    parallelRunsCount: number;
    targetActorId: string;
    targetActorInput: Record<string, any>;
    targetActorRunOptions: Record<string, any>;
}

interface State {
    parallelRunIds: string[];
    isInitialized: boolean;
}

await Actor.init();

const {
    parallelRunsCount= 1,
    targetActorId,
    targetActorInput = {},
    targetActorRunOptions = {},
} = await Actor.getInput<Input>() ?? {} as Input;
const apifyClient = new ApifyClient();

if (!targetActorId) throw new Error('Missing the "targetActorId" input!');

// Get the current run request queue and dataset, we use the default ones.
const requestQueue = await Actor.openRequestQueue();
const dataset = await Actor.openDataset();

// Spawn parallel runs and store their IDs in the state or continue if they are already running.
const state = await Actor.useState<State>('actor-state', { parallelRunIds: [], isInitialized: false });

if (state.isInitialized) {
    for (const runId of state.parallelRunIds) {
        const runClient = apifyClient.run(runId);
        const run = await runClient.get();

        // This should happen only if the run was deleted or the state was incorectly saved.
        if (!run) throw new Error(`The run ${runId} from state does not exists.`);

        if (run.status === 'RUNNING') {
            log.info('Parallel run is already running.', { runId });
        } else {
            log.info(`Parallel run was in state ${run.status}, resurrecting.`, { runId });
            await runClient.resurrect(targetActorRunOptions);
        }
    }
} else {
    for (let i = 0; i < parallelRunsCount; i++) {
        const run = await Actor.start(targetActorId, {
            ...targetActorInput,
            datasetId: dataset.id,
            requestQueueId: requestQueue.id,
        }, targetActorRunOptions);
        log.info(`Started parallel run with ID: ${run.id}`, { runId: run.id });
        state.parallelRunIds.push(run.id);
    }
    state.isInitialized = true;
}

const parallelRunPromises = state.parallelRunIds.map((runId) => {
    const runClient = apifyClient.run(runId);
    return runClient.waitForFinish();
});

// Abort parallel runs if the main run is aborted
Actor.on('aborting', async () => {
    for (const runId of state.parallelRunIds) {
        log.info('Aborting run', { runId });
        await apifyClient.run(runId).abort();
    }
});

// Wait for all parallel runs to finish
await Promise.all(parallelRunPromises);

// Gracefully exit the Actor process. It's recommended to quit all Actors with an exit()
await Actor.exit();
