---
title: Debug Actors on the Apify platform
sidebar_label: Debugging
description: Attach a debugger to an Actor run on the Apify platform. Use the browser-based Actor debugger, or tunnel the debug port to your local IDE with wstunnel.
sidebar_position: 8
slug: /actors/development/debugging
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

Most bugs reproduce locally with `apify run` and your IDE's debugger. Some don't. They depend on the platform's proxies, memory limits, environment variables, or data that exists only in a real run. This guide shows two independent ways to attach a debugger to an Actor run on the platform. Pick one:

- **Actor debugger** - a package you install in the image. You debug from your browser, with no local tooling.
- **wstunnel** - a generic TCP tunnel you add to the image. You debug from your local IDE.

## Infrastructure constraints

An Actor run is a Docker container on a shared worker machine. You can't open a TCP connection to the container, so there is no SSH and no port forwarding.

The one inbound channel is the [container web server](./programming_interface/container_web_server.md). Whatever listens on `ACTOR_WEB_SERVER_PORT` (default `4321`) inside the container is reachable at the run's container URL, `https://<run>.runs.apify.net`. The platform forwards HTTP and WebSocket traffic to that port. It doesn't forward raw TCP.

Debuggers speak raw TCP. The Node.js inspector listens on port `9229`, debugpy on `5678`. Each option in this guide solves this the same way: a small server inside the container bridges the debug port over WebSocket on the web server port.

This shapes what debugging on the platform looks like:

- Anyone who can reach the container URL can reach the debugger. A debugger is a code-execution channel into the run, with access to its environment, including `APIFY_TOKEN`.
- A run paused on a breakpoint keeps consuming compute and counts toward the run timeout. Set a generous timeout and abort the run when you finish.
- A [migration](./builds_and_runs/state_persistence.md) restarts the container and drops the debug session.
- Breakpoints bind to the deployed code. Keep your local checkout at the same commit as the build you debug.

## Choose an option

The two options are alternatives, not steps. Compare them and follow only the section for the one you pick.

| | Actor debugger | wstunnel |
| --- | --- | --- |
| Setup | Change the Dockerfile `CMD` | Add a binary, start it next to the debugger |
| Client | Any browser | wstunnel client and your IDE |
| Languages | Node.js/TypeScript, Python | Anything with a TCP debug protocol |
| Best for | Quick look at a run, no local setup | Full IDE experience |

## Option 1: Debug in the browser with Actor debugger

This option is complete on its own and needs no tunnel. The [actor-debugger](https://github.com/apify/actor-debugger) package launches your Actor under its native debugger and serves a debugger UI on the web server port. You open one URL from the run log in your browser. Nothing runs on your machine.

<Tabs groupId="language">
<TabItem value="javascript" label="JavaScript/TypeScript">

Install the package and swap the entrypoint in your Dockerfile:

```dockerfile
RUN npm install actor-debugger

# Replaces the normal entrypoint, for example CMD ["npm", "start"]
CMD ["npx", "actor-debugger", "--brk"]
```

The launcher finds your entrypoint from `scripts.start` or `main` in `package.json`, or from conventional paths like `dist/main.js`. Pass a path to override it: `CMD ["npx", "actor-debugger", "dist/main.js"]`.

The run log prints a URL in this form:

```text
https://<run>.runs.apify.net/devtools/js_app.html?wss=<run>.runs.apify.net/<uuid>
```

That page is Chrome DevTools connected to your Actor. TypeScript sources show up through source maps. The launcher inlines external `.js.map` files at startup, so any `tsc` build with `sourceMap` or `inlineSourceMap` enabled works.

</TabItem>
<TabItem value="python" label="Python">

Install the package and swap the entrypoint in your Dockerfile:

```dockerfile
RUN pip install actor-debugger

# Replaces the normal entrypoint, for example CMD ["python3", "-m", "src"]
CMD ["python3", "-m", "actor_debugger", "--brk"]
```

The launcher finds the runnable package in the working directory, which covers the Apify Python templates. Pass the entrypoint to override it: `CMD ["python3", "-m", "actor_debugger", "-m", "src"]` or `CMD ["python3", "-m", "actor_debugger", "main.py"]`.

The run log prints a URL in this form:

```text
https://<run>.runs.apify.net/ui/
```

That page is a debugger UI for [debugpy](https://github.com/microsoft/debugpy). Select a line number to set a breakpoint, then step, inspect variables, and evaluate expressions in the paused frame.

</TabItem>
</Tabs>

`--brk` pauses the Actor on its first line until you attach. Drop it to let the Actor run and attach mid-flight. To turn debugging off, restore the original `CMD` and rebuild.

## Option 2: Debug from your IDE with wstunnel

This option is complete on its own and doesn't use the actor-debugger package. [wstunnel](https://github.com/erebe/wstunnel) tunnels TCP over WebSocket. The server runs inside the container on the web server port. The client runs on your machine and exposes the remote debug port on `localhost`. Your IDE attaches to `localhost` as if the Actor ran there. This works for any language with a TCP debug protocol.

### Step 1: Add wstunnel to the image

Download the static release binary in your Dockerfile. The Apify base images differ in what download tool they ship.

<Tabs groupId="language">
<TabItem value="javascript" label="JavaScript/TypeScript">

```dockerfile
FROM apify/actor-node:24

# Alpine base image: use wget
ARG WSTUNNEL_VERSION=10.7.1
RUN wget -qO- "https://github.com/erebe/wstunnel/releases/download/v${WSTUNNEL_VERSION}/wstunnel_${WSTUNNEL_VERSION}_linux_amd64.tar.gz" \
    | tar -xz -C /usr/local/bin wstunnel
```

</TabItem>
<TabItem value="python" label="Python">

```dockerfile
FROM apify/actor-python:3.13

# Debian base image: use curl
ARG WSTUNNEL_VERSION=10.7.1
RUN curl -fsSL "https://github.com/erebe/wstunnel/releases/download/v${WSTUNNEL_VERSION}/wstunnel_${WSTUNNEL_VERSION}_linux_amd64.tar.gz" \
    | tar -xz -C /usr/local/bin wstunnel
```

Add `debugpy` to your `requirements.txt`.

</TabItem>
</Tabs>

### Step 2: Start the tunnel and the debugger

Define a `DEBUG_SECRET` [environment variable](./programming_interface/environment_variables.md) in the Actor version and mark it as secret. wstunnel accepts only WebSocket upgrades whose path starts with this value, which keeps random visitors of the container URL out.

Then replace the `CMD` so the container starts the tunnel server and the Actor under its debugger:

<Tabs groupId="language">
<TabItem value="javascript" label="JavaScript/TypeScript">

```dockerfile
CMD ["sh", "-c", "wstunnel server --restrict-to 127.0.0.1:9229 --restrict-http-upgrade-path-prefix \"$DEBUG_SECRET\" \"ws://0.0.0.0:$ACTOR_WEB_SERVER_PORT\" & exec node --inspect-brk=127.0.0.1:9229 dist/main.js"]
```

`--inspect-brk` pauses on the first line until a debugger attaches. Use `--inspect` to attach mid-run.

</TabItem>
<TabItem value="python" label="Python">

```dockerfile
CMD ["sh", "-c", "wstunnel server --restrict-to 127.0.0.1:5678 --restrict-http-upgrade-path-prefix \"$DEBUG_SECRET\" \"ws://0.0.0.0:$ACTOR_WEB_SERVER_PORT\" & exec python -m debugpy --listen 127.0.0.1:5678 --wait-for-client -m src"]
```

`--wait-for-client` pauses until a debugger attaches. Drop it to attach mid-run.

</TabItem>
</Tabs>

`--restrict-to` limits the tunnel to the debug port, so nothing else in the container becomes reachable. `exec` keeps the Actor as the main process, so it still receives the platform's shutdown signals.

You can also start `wstunnel server` from your Actor code and gate it on an input field. That avoids a separate debug build at the cost of shipping the binary in every build.

### Step 3: Connect from your machine

Install wstunnel locally with `brew install wstunnel` or a [release binary](https://github.com/erebe/wstunnel/releases). Start the run, copy the container URL from the run detail page, and open the tunnel:

```bash
wstunnel client --http-upgrade-path-prefix <DEBUG_SECRET> -L tcp://9229:127.0.0.1:9229 wss://<run>.runs.apify.net
```

Use `5678` in place of `9229` for Python. Leave the command running. Port `9229` on `localhost` now leads to the inspector inside the run.

### Step 4: Attach your IDE

Attach to `localhost` and map your project root to `/usr/src/app`, the working directory in the Apify base images.

<Tabs groupId="language">
<TabItem value="javascript" label="JavaScript/TypeScript">

VS Code `launch.json` configuration:

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

In JetBrains IDEs, create an **Attach to Node.js/Chrome** run configuration for `localhost:9229` and map the project root to `/usr/src/app` under **Remote URLs of local files**. Chrome users can open `chrome://inspect` and add `localhost:9229` as a target.

</TabItem>
<TabItem value="python" label="Python">

VS Code `launch.json` configuration:

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

In PyCharm 2026.1 or later, create an **Attach to DAP** run configuration for `localhost:5678` with the same path mapping.

</TabItem>
</Tabs>

Set a breakpoint and start the configuration. The run resumes under your debugger.

## Keep debugging out of production

:::caution Unauthenticated code execution
Either option exposes a code-execution endpoint on the container URL. The Actor debugger has no authentication. The wstunnel secret is only as protected as the run that prints or stores it.
:::

- Keep the debug `CMD` in a dedicated Actor version with its own build tag. Production builds keep their normal entrypoint.
- Never publish a build with a debug entrypoint to Apify Store.
- Run debug builds with [limited permissions](./permissions/index.md) where the Actor allows it.
- Abort the run when you finish. A paused run bills like a running one.
