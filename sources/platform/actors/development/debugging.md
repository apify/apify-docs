---
title: Debug Actors on the Apify platform
sidebar_label: Debugging
description: Learn how to attach a debugger to an Actor run on the Apify platform, so you can set breakpoints and inspect variables in a run as it executes.
sidebar_position: 8
slug: /actors/development/debugging
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

You can reproduce most bugs by running your Actor locally and using your IDE's debugger. However, some bugs are related to the platform's proxies, memory limits, environment variables, or data that exists only in a real run. This guide shows how to attach a debugger to such a run on the Apify platform.

## Infrastructure constraints

An Actor run is a Docker container on a shared worker machine. You can't open a TCP connection to the container, so there's no SSH and no port forwarding.

The one inbound channel is the [container web server](./programming_interface/container_web_server.md). Whatever listens on `ACTOR_WEB_SERVER_PORT` (default `4321`) inside the container is reachable at the run's container URL, `https://<run>.runs.apify.net`. The platform forwards HTTP and WebSocket traffic to that port. It doesn't forward raw TCP.

Debuggers speak raw TCP. The Node.js inspector listens on port `9229`, debugpy on `5678`. Bridging that mismatch takes a small server inside the container, which carries the debug port over WebSocket on the web server port.

These constraints shape what debugging on the platform looks like:

- Without an access check, anyone who can reach the container URL can reach the debugger. A debugger is a code-execution channel into the run, with access to its environment, including `APIFY_TOKEN`.
- A run paused on a breakpoint keeps consuming compute and counts toward the run timeout. Set a generous timeout and abort the run when you finish.
- A [migration](./builds_and_runs/state_persistence.md) restarts the container and drops the debug session.
- Breakpoints bind to the deployed code. Keep your local checkout at the same commit as the build you debug.

## Attach a debugger

You have two independent options:

| | Actor debugger | wstunnel |
| --- | --- | --- |
| Where you debug | In any browser, with no local tooling | In your local IDE |
| What you add to the image | The `actor-debugger` package | The `wstunnel` binary |
| Languages | Node.js/TypeScript, Python | Anything with a TCP debug protocol |
| Best for | A quick look at a run | A full IDE experience |

Select the option you want, then the language your Actor uses:

<Tabs groupId="debug-option">
<TabItem value="actor-debugger" label="Actor debugger">

The experimental [actor-debugger](https://github.com/apify/actor-debugger) package launches your Actor under its native debugger and serves a debugger UI on the web server port. You open one URL from the run log in your browser. Nothing runs on your machine.

<Tabs groupId="language">
<TabItem value="javascript" label="JavaScript/TypeScript">

1. Install the package in your Dockerfile, after your other dependencies, so the project's `npm install` doesn't prune it:

    ```dockerfile
    RUN npm install actor-debugger
    ```

1. Replace the Dockerfile entrypoint, for example `CMD ["node", "dist/main.js"]`, with the debug launcher:

    ```dockerfile
    CMD ["npx", "actor-debugger", "--brk"]
    ```

    The launcher finds your entrypoint from `scripts.start` or `main` in `package.json`, or from conventional paths like `dist/main.js`. To name the entrypoint yourself, pass its path: `CMD ["npx", "actor-debugger", "dist/main.js"]`.

1. Build the Actor, start a run, and open the URL from the run log in your browser:

    ```text
    https://<run>.runs.apify.net/devtools/js_app.html?wss=<run>.runs.apify.net/<uuid>
    ```

    That page is Chrome DevTools connected to your Actor. TypeScript sources show up through source maps. The launcher inlines external `.js.map` files at startup, so any `tsc` build with `sourceMap` or `inlineSourceMap` enabled works.

</TabItem>
<TabItem value="python" label="Python">

1. Install the package in your Dockerfile:

    ```dockerfile
    RUN pip install actor-debugger
    ```

1. Replace the Dockerfile entrypoint, for example `CMD ["python", "-m", "my_actor"]`, with the debug launcher:

    ```dockerfile
    CMD ["python", "-m", "actor_debugger", "--brk"]
    ```

    The launcher finds the runnable package in the working directory, which covers the Apify Python templates. To name the entrypoint yourself, pass the module or file: `CMD ["python", "-m", "actor_debugger", "-m", "my_actor"]` or `CMD ["python", "-m", "actor_debugger", "main.py"]`.

1. Build the Actor, start a run, and open the URL from the run log in your browser:

    ```text
    https://<run>.runs.apify.net/ui/
    ```

    That page is a debugger UI for [debugpy](https://github.com/microsoft/debugpy). Select a line number to set a breakpoint, then step, inspect variables, and evaluate expressions in the paused frame.

</TabItem>
</Tabs>

The `--brk` flag pauses the Actor on its first line and holds the run there until you open the debugger URL. Without the flag, the Actor starts working immediately and you can open the URL at any point during the run. To stop debugging, restore the original `CMD` and rebuild the Actor.

</TabItem>
<TabItem value="wstunnel" label="wstunnel">

[wstunnel](https://github.com/erebe/wstunnel) tunnels TCP over WebSocket. The server runs inside the container on the web server port. The client runs on your machine and exposes the remote debug port on `localhost`. Your IDE attaches to `localhost` as if the Actor ran there. The tunnel works for any language with a TCP debug protocol.

1. Download the static wstunnel release binary in your Dockerfile:

    <Tabs groupId="language">
    <TabItem value="javascript" label="JavaScript/TypeScript">

    ```dockerfile
    FROM apify/actor-node:24

    ARG WSTUNNEL_VERSION=10.7.1
    RUN wget -qO- "https://github.com/erebe/wstunnel/releases/download/v${WSTUNNEL_VERSION}/wstunnel_${WSTUNNEL_VERSION}_linux_amd64.tar.gz" \
        | tar -xz -C /usr/local/bin wstunnel \
        && chmod +x /usr/local/bin/wstunnel
    ```

    </TabItem>
    <TabItem value="python" label="Python">

    ```dockerfile
    FROM apify/actor-python:3.13

    ARG WSTUNNEL_VERSION=10.7.1
    RUN curl -fsSL "https://github.com/erebe/wstunnel/releases/download/v${WSTUNNEL_VERSION}/wstunnel_${WSTUNNEL_VERSION}_linux_amd64.tar.gz" \
        | tar -xz -C /usr/local/bin wstunnel \
        && chmod +x /usr/local/bin/wstunnel
    ```

    Add `debugpy` to your `requirements.txt`.

    </TabItem>
    </Tabs>

1. Define a `DEBUG_SECRET` [environment variable](./programming_interface/environment_variables.md) in the Actor version and mark it as secret. wstunnel accepts only WebSocket upgrades whose path starts with this value, which keeps random visitors of the container URL out.

1. Replace the `CMD` in your Dockerfile, so the container starts the tunnel server and the Actor under its debugger:

    <Tabs groupId="language">
    <TabItem value="javascript" label="JavaScript/TypeScript">

    ```dockerfile
    CMD ["sh", "-c", ": \"${DEBUG_SECRET:?}\"; wstunnel server --restrict-to 127.0.0.1:9229 --restrict-http-upgrade-path-prefix \"$DEBUG_SECRET\" \"ws://0.0.0.0:$ACTOR_WEB_SERVER_PORT\" & exec node --inspect-brk=127.0.0.1:9229 dist/main.js"]
    ```

    Replace `dist/main.js` with your Actor's entrypoint. The `--inspect-brk` flag pauses the Actor on its first line until a debugger attaches. Use `--inspect` instead to let the Actor start working immediately.

    </TabItem>
    <TabItem value="python" label="Python">

    ```dockerfile
    CMD ["sh", "-c", ": \"${DEBUG_SECRET:?}\"; wstunnel server --restrict-to 127.0.0.1:5678 --restrict-http-upgrade-path-prefix \"$DEBUG_SECRET\" \"ws://0.0.0.0:$ACTOR_WEB_SERVER_PORT\" & exec python -m debugpy --listen 127.0.0.1:5678 --wait-for-client -m my_actor"]
    ```

    Replace `my_actor` with your Actor's package. The `--wait-for-client` flag pauses the Actor on its first line until a debugger attaches. Omit the flag to let the Actor start working immediately.

    </TabItem>
    </Tabs>

    The `: "${DEBUG_SECRET:?}"` guard fails the run before anything starts when the variable is unset or empty, because an empty prefix lets in any client. The `--restrict-to` option limits the tunnel to the debug port, so nothing else in the container becomes reachable. The `exec` command keeps the Actor as the main process, so it still receives the platform's shutdown signals.

1. Build the Actor, start a run, and copy the container URL from the run detail page in Apify Console.

1. Install wstunnel on your machine with `brew install wstunnel` or download a [release binary](https://github.com/erebe/wstunnel/releases). Then open the tunnel, and leave the command running:

    ```bash
    wstunnel client --http-upgrade-path-prefix <DEBUG_SECRET> -L tcp://9229:127.0.0.1:9229 wss://<run>.runs.apify.net
    ```

    Use `5678` in place of both occurrences of `9229` for Python. The port on `localhost` now leads to the debugger inside the run.

1. Attach your IDE to `localhost` and map your project root to `/usr/src/app`, the working directory in the Apify base images:

    <Tabs groupId="language">
    <TabItem value="javascript" label="JavaScript/TypeScript">

    ```json
    {
        "type": "node",
        "request": "attach",
        "name": "Attach to Apify run",
        "address": "localhost",
        "port": 9229,
        "localRoot": "${workspaceFolder}",
        "remoteRoot": "/usr/src/app"
    }
    ```

    In JetBrains IDEs, create an **Attach to Node.js/Chrome** run configuration for `localhost:9229` instead, and map the project root to `/usr/src/app` under **Remote URLs of local files**. In Chrome, open `chrome://inspect` and add `localhost:9229` as a target.

    </TabItem>
    <TabItem value="python" label="Python">

    ```json
    {
        "type": "debugpy",
        "request": "attach",
        "name": "Attach to Apify run",
        "connect": { "host": "localhost", "port": 5678 },
        "pathMappings": [
            { "localRoot": "${workspaceFolder}", "remoteRoot": "/usr/src/app" }
        ]
    }
    ```

    In PyCharm 2026.1 or later, create an **Attach to DAP** run configuration for `localhost:5678` instead, with the same path mapping.

    </TabItem>
    </Tabs>

1. Set a breakpoint in your source files and start the configuration. The run resumes under your debugger.

You can also start `wstunnel server` from your Actor code and gate it on an input field. That approach avoids a separate debug build at the cost of shipping the binary in every build.

</TabItem>
</Tabs>

## Keep debugging out of production

Both options turn the run's container URL into a code-execution endpoint. The Actor debugger has no authentication, and with wstunnel, anyone who learns the secret gets the same access.

:::caution Never publish a debug build

A build with a debug entrypoint gives its users access to your Actor's environment, including `APIFY_TOKEN`. Keep such builds out of Apify Store.

:::

Limit the exposure while you debug:

- Keep the debug `CMD` in a dedicated Actor version with its own build tag. Production builds keep their normal entrypoint.
- Run debug builds with [limited permissions](./permissions/index.md) where the Actor allows it.
- Abort the run when you finish.
