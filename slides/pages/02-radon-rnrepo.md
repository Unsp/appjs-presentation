---
layout: center
---

# Radon

## Emulator wrapper in Cursor — not another IDE

Segment 2 · after Legend State

<div class="text-sm opacity-70 mt-8">

Commercial · Cursor marketplace · 14-day trial

</div>

<!--
Speaker note: ~5–7 min Radon block. Frame as emulator wrapper in VS Code / Cursor — not “another RN IDE”. License footnote only on slide; do not mention credit card. Install extension in Cursor and try.
-->

---
layout: full
---

<div class="relative w-full h-full p-3 box-border">

<img src="./assets/radon/preview.png" class="absolute inset-3 w-[calc(100%-1.5rem)] h-[calc(100%-1.5rem)] rounded-lg object-cover object-center" alt="" />

<div class="absolute left-5 top-1/2 -translate-y-1/2 z-10 w-[38%] max-w-md p-5 rounded-xl bg-black/88 text-white shadow-2xl leading-snug">

<h2 class="!text-white !mt-0 !mb-3 text-xl font-bold">Preview in the editor</h2>

<ul class="!text-white text-sm space-y-2 list-disc pl-4 m-0">
<li><strong>Integrated preview</strong> — iOS Simulator and Android emulator inside Cursor</li>
<li><strong>Builds under the hood</strong> — Radon drives native emulator builds</li>
<li><strong>Business apps</strong> — real API flows, navigation, and debugging in one window</li>
</ul>

</div>

</div>

<!--
Speaker note: Screenshots from production wallet app. Narrate over PNG — no live Radon on projector.
-->

---
layout: full
---

<div class="relative w-full h-full p-4 box-border bg-[#1e1e1e]">

<div class="absolute left-5 top-1/2 -translate-y-1/2 z-10 w-[36%] max-w-md p-5 rounded-xl bg-black/88 text-white shadow-2xl leading-snug">

<h2 class="!text-white !mt-0 !mb-3 text-xl font-bold">Multi-emulator</h2>

<ul class="!text-white text-sm space-y-2 list-disc pl-4 m-0">
<li>Switch <strong>iOS and Android</strong> in one editor window</li>
<li>Device picker without juggling separate Simulator windows</li>
<li>Quick device context for layout and platform quirks</li>
</ul>

</div>

<img src="./assets/radon/multi-emulator.png" class="absolute right-4 top-1/2 -translate-y-1/2 max-h-[calc(100%-2rem)] w-auto max-w-[58%] object-contain rounded-lg" alt="" />

</div>

---
layout: full
---

<div class="relative w-full h-full p-4 box-border bg-[#1e1e1e]">

<div class="absolute left-5 top-1/2 -translate-y-1/2 z-10 w-[36%] max-w-md p-5 rounded-xl bg-black/88 text-white shadow-2xl leading-snug">

<h2 class="!text-white !mt-0 !mb-3 text-xl font-bold">Inspect → source</h2>

<ul class="!text-white text-sm space-y-2 list-disc pl-4 m-0">
<li><strong>Right-click inspect</strong> on the preview</li>
<li>Jump from UI to <strong>component stack and source file</strong></li>
<li>Faster navigation in unfamiliar codebases</li>
</ul>

</div>

<img src="./assets/radon/inspect.png" class="absolute right-4 top-1/2 -translate-y-1/2 max-h-[calc(100%-2rem)] w-auto max-w-[58%] object-contain rounded-lg" alt="" />

</div>

---
layout: full
---

<div class="grid grid-rows-[auto_1fr] w-full h-full p-4 gap-3 box-border bg-[#1e1e1e]">

<div class="p-5 rounded-xl bg-black/88 text-white shadow-2xl leading-snug">

<h2 class="!text-white !mt-0 !mb-3 text-xl font-bold">Network inspector</h2>

<ul class="!text-white text-sm space-y-1 list-disc pl-4 m-0">
<li><strong>HTTP / fetch</strong> traffic — stronger than basic Expo Dev Tools</li>
<li>Inspect requests <strong>in the editor</strong> alongside your code</li>
<li>Real API debugging for production-shaped apps</li>
</ul>

</div>

<div class="flex items-end justify-center min-h-0 overflow-hidden">

<img src="./assets/radon/network.png" class="w-full max-h-full object-contain object-bottom rounded-lg" alt="" />

</div>

</div>

<!--
Speaker note: WebSockets not supported yet — do not claim WS inspection. No network throttling on slides.
-->

---
layout: full
---

<div class="relative w-full h-full p-3 box-border">

<img src="./assets/radon/debug.png" class="absolute inset-3 w-[calc(100%-1.5rem)] h-[calc(100%-1.5rem)] rounded-lg object-cover object-center" alt="" />

<div class="absolute left-1/2 -translate-x-1/2 top-5 z-10 w-[40%] max-w-lg px-4 py-4 rounded-xl bg-black/88 text-white shadow-2xl leading-snug">

<h2 class="!text-white !mt-0 !mb-2 text-xl font-bold text-center">Debugger</h2>

<ul class="!text-white text-sm space-y-1 list-disc pl-4 m-0">
<li><strong>Breakpoints end-to-end</strong> — not a demo-only path</li>
<li>Pause in real app code during day-to-day work</li>
<li>Router-aware navigation while debugging</li>
</ul>

</div>

</div>

---
layout: full
---

<div class="relative w-full h-full p-4 box-border bg-[#1e1e1e]">

<div class="absolute left-5 top-1/2 -translate-y-1/2 z-10 w-[36%] max-w-md p-5 rounded-xl bg-black/88 text-white shadow-2xl leading-snug">

<h2 class="!text-white !mt-0 !mb-3 text-xl font-bold">Built-in tools</h2>

<ul class="!text-white text-sm space-y-2 list-disc pl-4 m-0">
<li><strong>Address bar</strong>, <strong>deep links</strong>, <strong>local auth</strong> — painful navigation flows in one place</li>
<li><strong>Screen recording</strong> — bug reports and QA handoff</li>
<li>TanStack DevTools and other dev-tool plugins built in</li>
</ul>

</div>

<img src="./assets/radon/built-in-tools.png" class="absolute right-4 top-1/2 -translate-y-1/2 max-h-[calc(100%-2rem)] w-auto max-w-[58%] object-contain rounded-lg" alt="" />

</div>

---
layout: full
---

<div class="relative w-full h-full p-6 box-border bg-[#1e1e1e]">

<div class="absolute top-5 left-5 z-10 max-w-[52%] p-5 rounded-xl bg-black/88 text-white shadow-2xl leading-snug">

<h2 class="!text-white !mt-0 !mb-3 text-xl font-bold">Agents + MCP</h2>

<p class="!text-white !mb-4 text-sm"><strong>Design → code → visual verify</strong> — closed loop in the editor</p>

<ol class="!text-white text-sm space-y-2 pl-5 m-0 list-decimal">
<li>Agent reads <strong>Figma</strong> (design source)</li>
<li>Agent implements UI changes in the repo</li>
<li>Agent verifies via <strong>Radon preview / screenshot</strong> — does it match?</li>
</ol>

</div>

<img src="./assets/radon/mcp-tools.png" class="absolute bottom-5 right-5 max-h-[38vh] w-auto max-w-[240px] object-contain rounded-lg shadow-lg" alt="" />

</div>

<!--
Speaker note: ~1 min text beat. Radon MCP tools panel — small UI, not a live demo.
-->

---
layout: full
---

<div class="relative w-full h-full p-3 box-border">

<img src="./assets/radon-eas-rnrepo.png" class="absolute inset-3 w-[calc(100%-1.5rem)] h-[calc(100%-1.5rem)] rounded-lg object-cover object-center" alt="" />

<div style="position: absolute; left: 0.75rem; right: 0.75rem; top: 59.5%; height: 1px; background: #ef4444; z-index: 10;"></div>

<div class="absolute right-5 top-5 z-10 w-[38%] max-w-md p-5 rounded-xl bg-black/88 text-white shadow-2xl leading-snug">

<h2 class="!text-white !mt-0 !mb-3 text-xl font-bold">RNRepo</h2>

<p class="!text-white !mb-3 text-sm">Separate closing beat — prebuilt native artifacts, not tied to Radon</p>

<ul class="!text-white text-sm space-y-1 list-disc pl-4 m-0">
<li><code class="text-xs">@rnrepo/expo-config-plugin</code> · <code class="text-xs">@rnrepo/build-tools</code></li>
<li>Android EAS: <strong>~30 min → ~20 min</strong> (<strong>~10 min saved</strong> per build)</li>
<li><strong>~2 min setup</strong> — strong ROI per CI run</li>
<li><strong>Beta</strong> · <strong>New Architecture</strong> only</li>
</ul>

</div>

<div class="absolute left-1/2 -translate-x-1/2 z-10 px-3 py-1.5 rounded-md bg-black/88 text-white/90 shadow-lg text-center text-xs leading-tight" style="top: calc(59.5% + 0.5rem);">

<div>RNRepo added</div>

<div>~30m → ~20m</div>

</div>

</div>

<!--
Speaker note: ~1–2 min RNRepo closing. Red cutoff between build 1.0.17 (85) 22m 4s and (84) 31m 22s. Overlay top ~59.5% — tune in preview if needed. No monorepo pitch; no vendor “up to 2×”.
-->

---
layout: center
---

Hand off → **react-teleport** (partner)

<!--
Speaker note: end of segment 2 — partner picks up react-teleport.
-->
