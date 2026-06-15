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
<li>TypeGPU + Redraw — <strong>K</strong></li>
<li>expo-observe — <strong>M</strong> (партнёр)</li>
<li>keyframer.dev — <strong>K</strong></li>
</ol>

</div>

</div>

---
src: ./pages/02-radon-rnrepo.md
---

<!-- Radon + RNRepo → pages/02-radon-rnrepo.md -->

---
layout: full
---

<div class="flex items-center justify-center w-full h-full p-8 box-border bg-[#1e1e1e]">

<div class="max-w-2xl p-8 rounded-xl bg-black/88 text-white shadow-2xl text-center leading-snug">

<h1 class="!text-white !mt-0 !mb-3 text-3xl font-bold">TypeGPU + Redraw</h1>

<p class="!text-white !mb-0 text-sm opacity-70">Сегмент 4 · GPU для бизнес-UI</p>

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

<h2 class="!text-white !mt-0 !mb-3 text-xl font-bold">TypeGPU — выделенный GPU-поток</h2>

<p class="!text-white !mb-3 text-sm opacity-90">В новых версиях — работа на <strong>выделенном GPU-потоке</strong></p>

<ul class="!text-white text-sm space-y-2 list-disc pl-4 m-0">
<li>В отличие от старой модели (всё на JS + UI)</li>
<li><strong>Шейдеры на TypeScript</strong> — не нужна команда только на GLSL</li>
<li>Поддерживаемо в TS / React Native кодовой базе</li>
</ul>

</div>

</div>

---
layout: full
---

<div class="flex items-center w-full h-full p-8 box-border bg-[#1e1e1e]">

<div class="max-w-2xl p-6 rounded-xl bg-black/88 text-white shadow-2xl leading-snug">

<h2 class="!text-white !mt-0 !mb-3 text-xl font-bold">Redraw (экспериментальный)</h2>

<p class="!text-white !mb-3 text-sm opacity-90">Пакет-сосед — разведка:</p>

<ul class="!text-white text-sm space-y-2 list-disc pl-4 m-0">
<li>Смотрим полезные API / примеры эффектов</li>
<li>На слайдах — только то, что пережило оценку</li>
<li>Без завышенных обещаний</li>
</ul>

</div>

</div>

---
layout: full
---

<div class="flex items-center w-full h-full p-8 box-border bg-[#1e1e1e]">

<div class="max-w-2xl p-6 rounded-xl bg-black/88 text-white shadow-2xl leading-snug">

<h2 class="!text-white !mt-0 !mb-3 text-xl font-bold">Демо-приложение · TypeGPU</h2>

<p class="!text-white !mb-3 text-sm"><strong>Тяжёлый сегмент</strong> — переключаемся на Expo demo:</p>

<ul class="!text-white text-sm space-y-2 list-disc pl-4 m-0">
<li>GPU blur / animation vs baseline без GPU</li>
<li>Один mock «бизнес-экрана» (modal + chart?)</li>
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
