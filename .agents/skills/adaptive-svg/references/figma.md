# Exporting the variants from Figma

The Figma connector can export a whole frame as one SVG with the same content as Figma's **Copy as SVG**. Run the snippets below with its `use_figma` tool, which executes Plugin API code. They only read the file. Follow the connector's own setup first: start a session for the file and load its `figma-use` guidance.

A link has the form `https://www.figma.com/design/<fileKey>/<name>?node-id=<a>-<b>`. Pass `<fileKey>` to the tool and use `<a>:<b>` as the node ID. The link can point to a page, a section, or one of the frames.

## List the frames

Set `NODE_ID` to the linked node. The snippet finds the frames around the linked node, including frames inside sections, and returns each one's size, background color, and the length and hash of its SVG export:

```js
const NODE_ID = '<a>:<b>';
const node = await figma.getNodeByIdAsync(NODE_ID);
let page = node;
while (page.type !== 'PAGE') page = page.parent;
await figma.setCurrentPageAsync(page);
const isFrame = (n) => n.type === 'FRAME' || n.type === 'COMPONENT' || n.type === 'INSTANCE';
const container = isFrame(node) ? node.parent : node;
const frames = [];
const collect = (parent) => {
  for (const child of parent.children) {
    if (isFrame(child)) frames.push(child);
    else if (child.type === 'SECTION' || child.type === 'GROUP') collect(child);
  }
};
collect(container);
const hex = (c) => '#' + [c.r, c.g, c.b].map((v) => Math.round(v * 255).toString(16).padStart(2, '0')).join('').toUpperCase();
const djb2 = (t) => { let h = 5381; for (let i = 0; i < t.length; i++) h = (Math.imul(h, 33) ^ t.charCodeAt(i)) >>> 0; return h; };
const out = [];
for (const f of frames.slice(0, 30)) {
  const svg = (await f.exportAsync({ format: 'SVG_STRING' })).trimEnd();
  const fill = (f.fills || []).find((p) => p.type === 'SOLID' && p.visible !== false);
  out.push({ id: f.id, name: f.name, width: f.width, height: f.height, background: fill ? hex(fill.color) : null, length: svg.length, hash: djb2(svg) });
}
return { page: page.name, linked: node.name, framesFound: frames.length, frames: out };
```

Pair the frames by name, which usually differs only in a light or dark suffix, and check that the pair has the same size and one light and one dark background. If `framesFound` is over 30, link the section or frame instead of the whole page.

## Export one frame

Set `NODE_ID` to the frame's `id` from the list. The result is the raw SVG text:

```js
const NODE_ID = '<frame id>';
const OFFSET = 0;
const node = await figma.getNodeByIdAsync(NODE_ID);
let page = node;
while (page.type !== 'PAGE') page = page.parent;
await figma.setCurrentPageAsync(page);
const svg = (await node.exportAsync({ format: 'SVG_STRING' })).trimEnd();
return svg.slice(OFFSET, OFFSET + 40000);
```

A `use_figma` result is limited to 48 KB, so one call returns at most 40,000 characters. Run the variants as separate calls. For a longer export, run it again with `OFFSET` set to 40000, 80000, and so on, and join the parts.

Write the text exactly as returned to `/tmp/adaptive-svg/<name>/light.svg` or `dark.svg`, then compute its length and hash the same way the list did:

```bash
node -e "const t = require('fs').readFileSync(process.argv[1], 'utf8').trimEnd(); let h = 5381; for (let i = 0; i < t.length; i++) h = (Math.imul(h, 33) ^ t.charCodeAt(i)) >>> 0; console.log('length=' + t.length + ' hash=' + h)" /tmp/adaptive-svg/<name>/light.svg
```

Both numbers must match the list. The export passes through the conversation before it's written, so a mismatch means it changed on the way, and a changed color would merge without an error. Write it again from the tool result. Don't fix it up by hand.

## Other ways to get the SVG

- **`download_assets`** with `defaultFormat: svg` returns the whole frame as `export`, but as a temporary URL on `www.figma.com`. Use it where the network allows that host. Cloud sandboxes often block it
- **Figma's REST API** (`GET https://api.figma.com/v1/images/<fileKey>?ids=<node>&format=svg`) needs a personal access token and network access to `api.figma.com`
- **Copy as SVG** in Figma, saved to files by the user, works everywhere. The exports have the same content as `exportAsync`, though attributes can come in a different order
