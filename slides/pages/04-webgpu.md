---
layout: full
---

<div class="flex flex-col items-center justify-center w-full h-full p-8 box-border text-center leading-snug max-w-2xl mx-auto">

<h1 class="!text-white !mt-0 !mb-3 text-3xl font-bold">WebGPU в React Native</h1>

<p class="!text-white !mb-0 text-lg font-normal opacity-90">Теперь это полноценный native-стек</p>

</div>

<!--
Speaker note: ~8–12 мин слайды + ~3–5 мин live. Тезис: WebGPU на RN — рабочий native-стек, не «когда-нибудь». Перед сегментом: npm run ios на iPhone, приложение уже открыто.
-->

---
layout: full
---

<div class="flex flex-col justify-center w-full h-full p-8 box-border max-w-2xl leading-snug">

<h2 class="!text-white !mt-0 !mb-3 text-xl font-bold">Что это значит на практике</h2>

<p class="!text-white !mb-3 text-sm opacity-90"><strong>react-native-webgpu</strong> — WebGPU на iOS и Android через <strong>Dawn</strong>. API совпадает с вебом: canvas, WGSL, тот же mental model, что в Chrome.</p>

<ul class="!text-white text-sm space-y-2 list-disc pl-4 m-0">
<li><strong>Native build</strong> — <code>expo prebuild</code></li>
<li><strong>New Architecture</strong> — RN ≥ 0.81</li>
<li>Стек молодой, но уже с документацией и рабочими интеграциями</li>
</ul>

</div>

<!--
Speaker note: react-native-webgpu, не react-native-wgpu. prebuild + New Arch — обязательны. Maturity: «молодой, но реальный» — не keyframer-alpha.
-->

---
layout: full
---

<div class="flex flex-col justify-center w-full h-full p-8 box-border max-w-2xl leading-snug">

<h2 class="!text-white !mt-0 !mb-3 text-xl font-bold">Экосистема на WebGPU</h2>

<p class="!text-white !mb-3 text-sm opacity-90"><strong>react-native-webgpu</strong> — общий фундамент; сверху разные слои:</p>

<ul class="!text-white text-sm space-y-2 list-disc pl-4 m-0">
<li><strong>React Native Skia</strong> — переход с <strong>Ganesh</strong> (Metal / OpenGL) на <strong>Graphite</strong> / WebGPU (<code>@next</code>); тот же <code>&lt;Canvas&gt;</code>, шейдеры SKSL</li>
<li><strong>Redraw</strong> — 2D UI на TypeGPU</li>
<li><strong>Three.js / R3F</strong> — 3D в RN уже строится на том же WebGPU-стеке</li>
</ul>

</div>

<!--
Speaker note: ~1 мин обзор. Только Skia — реальная миграция backend (Ganesh → Graphite). Redraw — новый toolkit на TypeGPU, не «переезд». R3F изначально на этом стеке. Дальше: TypeGPU → код → зачем в продукте → Redraw подробнее...
-->

---
layout: full
---

<div class="flex flex-col justify-center w-full h-full p-8 box-border max-w-2xl leading-snug">

<h2 class="!text-white !mt-0 !mb-3 text-xl font-bold">TypeGPU — шейдеры на TypeScript</h2>

<p class="!text-white !mb-3 text-sm opacity-90">Библиотека от Software Mansion — WebGPU без ручного WGSL:</p>

<ul class="!text-white text-sm space-y-2 list-disc pl-4 m-0">
<li>Эффекты и анимация пишутся на <strong>TypeScript</strong> — привычный язык и типы</li>
<li><code>'use gpu'</code> — помечаете функцию, её тело уходит на GPU</li>
<li>Для React Native — готовые хуки вместо низкоуровневой настройки canvas</li>
<li>Компилятор сам собирает шейдер — не нужно держать WGSL в строках</li>
</ul>

</div>

<!--
Speaker note: Software Mansion. Акцент: TS вместо WGSL в строках, 'use gpu', хуки для canvas. Не углубляться в API — на следующем слайде код.
-->

---
layout: full
---

<div class="flex items-center justify-center w-full h-full gap-5 p-6 box-border">

<div class="shrink-0 w-[28%] max-w-xs leading-snug">

<h2 class="!text-white !mt-0 !mb-0 text-lg font-bold">'use gpu' — так выглядит шейдер</h2>

</div>

<div class="min-w-0 w-[62%] max-h-[calc(100%-2rem)] rounded-xl [&_pre]:!text-[10px] [&_pre]:!leading-tight [&_pre]:!m-0 [&_pre]:!p-2 [&_pre]:!whitespace-pre-wrap [&_pre]:!break-all [&_code]:!text-[10px]">

<<< ../examples/video-shader-slide.ts

</div>

</div>

<!--
Speaker note: ~30 с. Упрощённый фрагмент из демо — sample, grade, toggle. Не зачитывать построчно. Полный pipeline (~800 строк) в приложении, на слайд не лезет.
-->

---
layout: full
---

<div class="flex flex-col justify-center w-full h-full p-8 box-border max-w-2xl leading-snug">

<h2 class="!text-white !mt-0 !mb-3 text-xl font-bold">Свой GPU-эффект</h2>

<p class="!text-white !mb-3 text-sm opacity-90">Когда обычного UI и Skia мало:</p>

<ul class="!text-white text-sm space-y-2 list-disc pl-4 m-0">
<li><strong>Шейдеры на TypeScript</strong> — typesafe, автокомплит, привычный синтаксис; GPU-логику всё равно нужно понимать, но писать удобнее</li>
<li><strong>Свой сценарий обработки</strong> — например, кадр видео → обработка на GPU → экран; не через готовый 2D-canvas</li>
<li><strong>Любая логика в одном месте</strong> — цвет, маски, кнопки в шейдере; не набор стандартных фильтров</li>
</ul>

</div>

<!--
Speaker note: честно: blur/glass и много 2D — уже Skia. TypeGPU — свой pipeline (video → GPU → экран), TS typesafe. Shader-разработчики никуда не делись — DX удобнее, не «RN-дев всё поймёт сам». Мост к live demo.
-->

---
layout: full
---

<div class="relative w-full h-full p-3 box-border">

<div class="absolute inset-3 z-0 grid grid-cols-2 gap-0 min-h-0">

<img src="../assets/webgpu/redraw-dpad.png" class="w-full h-full object-contain object-center" alt="" />

<img src="../assets/webgpu/redraw-hello.png" class="w-full h-full object-contain object-center" alt="" />

</div>

<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[56%] max-w-2xl p-6 rounded-xl bg-black/88 text-white shadow-2xl leading-snug">

<h2 class="!text-white !mt-0 !mb-3 text-xl font-bold">Redraw</h2>

<p class="!text-white !mb-3 text-sm opacity-90">2D UI-toolkit — <strong>построен на TypeGPU</strong> и <strong>react-native-webgpu</strong>.</p>

<ul class="!text-white text-sm space-y-2 list-disc pl-4 m-0">
<li>Векторный UI, frosted glass, кастомные материалы через <code>'use gpu'</code></li>
<li>Отдельный слой поверх WebGPU — не часть Skia</li>
<li>Сейчас <strong>subscriber preview</strong> — RN-пакеты не в публичном npm</li>
<li>Примеры и редактор — <strong>wcandillon.github.io/redraw</strong></li>
</ul>

</div>

</div>

<!--
Speaker note: ~1 мин. Скриншоты с wcandillon.github.io/redraw — не live demo. Greenfield на TypeGPU + react-native-webgpu. Subscriber preview, не public npm. William Candillon — и webgpu, и RN Skia.
-->

---
layout: full
---

<div class="flex items-center justify-center w-full h-full p-8 box-border text-center leading-snug">

<h1 class="!text-white !mt-0 !mb-0 text-3xl font-bold">Демо</h1>

</div>

<!--
Speaker note: переключиться на Expo app (~3–5 мин). VideoEffectCanvas: video shader, toggles Vignette/Invert/Noir/Neon, play/scrubber с ripples в шейдере. VideoEffectFallback если GPU не поднялся. После правок шейдера — Radon Restart, не hot reload.
-->
