---
theme: default
title: React Native & Expo — инструменты экосистемы
author: Kirill Golubev
info: |
  Парный доклад. Этот дек — сегменты Кирилла (K).
  Сегменты партнёра (M) будут добавлены позже.
transition: slide-left
mdc: true
---

---
layout: full
---

<div class="flex items-center justify-center w-full h-full p-8 box-border bg-[#1e1e1e]">

<div class="max-w-2xl p-10 rounded-xl bg-black/88 text-white shadow-2xl text-center leading-snug">

<h1 class="!text-white !mt-0 !mb-4 text-4xl font-bold">React Native & Expo</h1>

<h2 class="!text-white !mt-0 !mb-4 text-xl font-normal opacity-90">Инструменты экосистемы для бизнес-приложений</h2>

<p class="!text-white !mb-0 text-sm opacity-70">Парный доклад · сегменты Кирилла (K)</p>

</div>

</div>

<!--
Speaker note: вступление — передать слово партнёру для Legend State (сегмент 1).
-->

---
layout: full
---

<div class="flex items-center justify-center w-full h-full p-8 box-border bg-[#1e1e1e]">

<div class="w-full max-w-md p-6 rounded-xl bg-black/88 text-white shadow-2xl leading-snug">

<h1 class="!text-white !mt-0 !mb-4 text-2xl font-bold text-center">Порядок доклада</h1>

<ol class="!text-white text-sm space-y-2 pl-5 m-0 list-decimal">
<li>Legend State — <strong>M</strong> (партнёр)</li>
<li>Radon + RNRepo — <strong>K</strong></li>
<li>react-teleport — <strong>M</strong> (партнёр)</li>
<li>WebGPU в React Native — <strong>K</strong></li>
<li>expo-observe — <strong>M</strong> (партнёр)</li>
<li>keyframer.dev — <strong>K</strong></li>
</ol>

</div>

</div>

---
src: ./pages/01-legend-state.md
---

<!-- Legend State → pages/01-legend-state.md -->

---
layout: full
---

---
src: ./pages/02-radon-rnrepo.md
---

<!-- Radon + RNRepo → pages/02-radon-rnrepo.md -->

---
layout: full
---

<div class="flex items-center justify-center w-full h-full p-8 box-border bg-[#1e1e1e]">

<div class="max-w-2xl p-8 rounded-xl bg-black/88 text-white shadow-2xl text-center leading-snug">

<h1 class="!text-white !mt-0 !mb-3 text-3xl font-bold">WebGPU в React Native</h1>

<p class="!text-white !mb-0 text-sm opacity-70">Сегмент 4</p>

</div>

</div>

---
layout: full
---

<div class="flex items-center w-full h-full p-8 box-border bg-[#1e1e1e]">

<div class="max-w-2xl p-6 rounded-xl bg-black/88 text-white shadow-2xl leading-snug">

<h2 class="!text-white !mt-0 !mb-3 text-xl font-bold">Зачем GPU в бизнес-приложениях</h2>

<p class="!text-white !mb-3 text-sm opacity-90">Не игры — продуктовый UI, который должен оставаться плавным:</p>

<ul class="!text-white text-sm space-y-2 list-disc pl-4 m-0">
<li>Матовые панели и <strong>performant blur</strong></li>
<li>Богатые микровзаимодействия под списками, модалками, табами</li>
<li>Scroll-linked эффекты, анимированные графики</li>
<li>То, что раньше дёргалось на <strong>JS / UI thread</strong></li>
</ul>

</div>

</div>

---
layout: full
---

<div class="flex items-center w-full h-full p-8 box-border bg-[#1e1e1e]">

<div class="max-w-2xl p-6 rounded-xl bg-black/88 text-white shadow-2xl leading-snug">

<h2 class="!text-white !mt-0 !mb-3 text-xl font-bold">WebGPU на React Native</h2>

<p class="!text-white !mb-3 text-sm opacity-90">Фундамент — <strong>react-native-wgpu</strong> (WebGPU / Dawn на iOS и Android):</p>

<ul class="!text-white text-sm space-y-2 list-disc pl-4 m-0">
<li><strong>Native build</strong> — нативный модуль, `expo prebuild`</li>
<li><strong>New Architecture</strong> — RN ≥ 0.81</li>
<li>Низкоуровневый WebGPU API + слои DX сверху</li>
</ul>

</div>

</div>

---
layout: full
---

<div class="flex items-center w-full h-full p-8 box-border bg-[#1e1e1e]">

<div class="max-w-2xl p-6 rounded-xl bg-black/88 text-white shadow-2xl leading-snug">

<h2 class="!text-white !mt-0 !mb-3 text-xl font-bold">Экосистема на WebGPU</h2>

<p class="!text-white !mb-3 text-sm opacity-90">Разные слои на одном стеке:</p>

<ul class="!text-white text-sm space-y-2 list-disc pl-4 m-0">
<li><strong>Skia Graphite</strong> (<code>@next</code>) — Skia на WebGPU</li>
<li><strong>Redraw</strong> — векторный UI на TypeGPU (preview)</li>
<li>В демо — только контекст; live = TypeGPU case study</li>
</ul>

</div>

</div>

---
layout: full
---

<div class="flex items-center w-full h-full p-8 box-border bg-[#1e1e1e]">

<div class="max-w-2xl p-6 rounded-xl bg-black/88 text-white shadow-2xl leading-snug">

<h2 class="!text-white !mt-0 !mb-3 text-xl font-bold">TypeGPU</h2>

<p class="!text-white !mb-3 text-sm opacity-90">Case study для демо — шейдеры на TypeScript:</p>

<ul class="!text-white text-sm space-y-2 list-disc pl-4 m-0">
<li><code>'use gpu'</code> → WGSL через <code>unplugin-typegpu</code></li>
<li><code>@typegpu/react</code> — хуки поверх canvas</li>
<li>Live demo: видео → <code>texture_external</code> → shader grade</li>
</ul>

</div>

</div>

---
layout: full
---

<div class="flex items-center w-full h-full p-8 box-border bg-[#1e1e1e]">

<div class="max-w-2xl p-6 rounded-xl bg-black/88 text-white shadow-2xl leading-snug">

<h2 class="!text-white !mt-0 !mb-3 text-xl font-bold">Демо-приложение</h2>

<p class="!text-white !mb-3 text-sm"><strong>Тяжёлый сегмент</strong> — переключаемся на Expo demo:</p>

<ul class="!text-white text-sm space-y-2 list-disc pl-4 m-0">
<li>TypeGPU video shader — zero-copy <code>importExternalTexture</code></li>
<li>Wave chart — <code>'use gpu'</code> живой график</li>
<li>Два экрана в demo — свайп / стрелки</li>
<li>Fallback, если GPU-путь не сработает на устройстве</li>
</ul>

<p class="!text-white !mt-4 !mb-0 text-sm opacity-70">Передаём слово → <strong>expo-observe</strong> (партнёр)</p>

</div>

</div>

---
src: ./pages/06-keyframer.md
---

<!-- keyframer → pages/06-keyframer.md -->

---
layout: full
---

<div class="flex items-center justify-center w-full h-full p-8 box-border bg-[#1e1e1e]">

<div class="p-8 rounded-xl bg-black/88 text-white shadow-2xl text-center leading-snug">

<h1 class="!text-white !mt-0 !mb-3 text-3xl font-bold">Вопросы?</h1>

<p class="!text-white !mb-0 text-sm opacity-70">Demo app · Slidev deck · <code class="text-xs">docs/outline/</code></p>

</div>

</div>
