---
layout: full
---

<div class="flex flex-col items-center justify-center w-full h-full p-8 box-border text-center max-w-2xl mx-auto gap-4">

<h1 class="!text-white !m-0 text-3xl font-bold leading-tight">Illusion of Portals</h1>

<h1 class="!text-white !m-0 text-3xl font-bold leading-tight">&</h1>

<h1 class="!text-white !m-0 text-3xl font-bold leading-tight">react-native-teleport</h1>

</div>

<!--
Сегодня я расскажу про react-native-teleport — библиотеку, которая добавляет в React Native возможность переносить UI между разными контейнерами без пересоздания компонента.
Основная идея простая: не destroy/create, а move
-->

---
layout: full
---

<div class="flex flex-col items-start justify-center w-full h-full px-8 py-6 box-border leading-snug max-w-3xl">

<h2 class="!text-white !mt-0 !mb-4 text-2xl font-bold tracking-tight w-full text-left">Основная проблема</h2>

<p class="!text-white !mb-0 text-lg font-normal opacity-90 leading-relaxed text-left">Компонент логически расположен в одном месте, но визуально должен находиться в другом</p>

</div>

<!--
В мобильных приложениях часто есть UI, который логически принадлежит одному экрану или компоненту, но визуально должен быть отрисован выше, шире или в другом месте дерева.
Простой пример — tooltip, modal, context menu или fullscreen video.
-->

---
layout: full
---

<style>
.rt-portal-tree {
  position: relative;
  width: 168px;
  height: 118px;
}

.rt-portal-tree-lines {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.rt-portal-tree-node {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 9999px;
  background: #fff;
  color: #111;
  font-size: 10px;
  font-weight: 600;
  line-height: 1;
  text-align: center;
}

.rt-portal-tree-node--0 {
  left: 8px;
  top: 8px;
}

.rt-portal-tree-node--1 {
  left: 56px;
  top: 40px;
}

.rt-portal-tree-node--2 {
  left: 104px;
  top: 72px;
}

.rt-portal-tree-node--wide {
  width: 58px;
  height: 48px;
  font-size: 7px;
  letter-spacing: -0.02em;
}

.rt-portal-tree-node--wide.rt-portal-tree-node--1 {
  left: 51px;
}
</style>

<div class="flex flex-col items-start justify-center w-full h-full px-8 py-6 box-border leading-snug max-w-4xl gap-5">

<h2 class="!text-white !mt-0 !mb-0 text-2xl font-bold tracking-tight w-full text-left shrink-0">В Web есть portals</h2>

<div class="flex w-full items-start gap-10 min-h-0 pt-4">

<div class="min-w-0 shrink-0 w-[42%] -mt-1 [&_pre]:!m-0 [&_pre]:!text-sm">

```ts {maxHeight:'120px'}
createPortal(children, domNode)
```

</div>

<div class="flex shrink-0 flex-col gap-5 ml-auto">

<div class="flex flex-col gap-2">
<span class="text-xs font-semibold text-white/60">React tree:</span>
<div class="rt-portal-tree">
<svg class="rt-portal-tree-lines" viewBox="0 0 168 118" fill="none" aria-hidden="true">
<line x1="32" y1="32" x2="80" y2="64" stroke="#fff" stroke-width="1.5"/>
<line x1="80" y1="64" x2="128" y2="96" stroke="#fff" stroke-width="1.5"/>
</svg>
<span class="rt-portal-tree-node rt-portal-tree-node--0">App</span>
<span class="rt-portal-tree-node rt-portal-tree-node--1">Button</span>
<span class="rt-portal-tree-node rt-portal-tree-node--2">Modal</span>
</div>
</div>

<div class="flex flex-col gap-2">
<span class="text-xs font-semibold text-white/60">DOM tree:</span>
<div class="rt-portal-tree">
<svg class="rt-portal-tree-lines" viewBox="0 0 168 118" fill="none" aria-hidden="true">
<line x1="32" y1="32" x2="80" y2="64" stroke="#fff" stroke-width="1.5"/>
<line x1="80" y1="64" x2="133" y2="96" stroke="#fff" stroke-width="1.5"/>
</svg>
<span class="rt-portal-tree-node rt-portal-tree-node--0">body</span>
<span class="rt-portal-tree-node rt-portal-tree-node--1 rt-portal-tree-node--wide">#modal-root</span>
<span class="rt-portal-tree-node rt-portal-tree-node--2">Modal</span>
</div>
</div>

</div>

</div>

</div>

<!--
На web эта проблема решается через createPortal.
React-компонент остается частью своего логического React-дерева, но DOM-элемент появляется в другом месте, например внутри body или специального modal-root.
-->

---
layout: full
---

<div class="flex flex-col items-start justify-center w-full h-full px-8 py-6 box-border leading-snug max-w-3xl gap-4">

<h2 class="!text-white !mt-0 !mb-0 text-2xl font-bold tracking-tight w-full text-left shrink-0">В React Native аналогов нет</h2>

<p class="!text-white !mb-0 text-lg font-normal opacity-90 leading-relaxed text-left">Но есть примитив Modal</p>

<p v-click class="!text-white !mb-0 text-lg font-normal opacity-90 leading-relaxed text-left">Modal ≠ full portal system</p>

</div>

<!--
В React Native нет прямого аналога createPortal.
Есть Modal, но это не полноценный portal primitive.
Modal умеет показать UI поверх всего, но не дает гибкого контроля, где именно этот UI должен жить в hierarchy.
-->

---
layout: full
---

<div class="flex flex-col items-start justify-center w-full h-full px-8 py-6 box-border leading-snug max-w-3xl gap-4">

<h2 class="!text-white !mt-0 !mb-0 text-2xl font-bold tracking-tight w-full text-left shrink-0">Существующие RN portals и как они работают</h2>

<ul class="!text-white text-lg font-normal opacity-90 space-y-3 list-disc pl-5 m-0 leading-relaxed">
<li>PortalHost регистрируется в shared store</li>
<li>Portal добавляет children в store</li>
<li>PortalHost рендерит полученные children</li>
</ul>

</div>

<!--
Большинство portal-библиотек в React Native используют похожий подход.
Есть PortalHost, который регистрируется в shared registry.
Потом Portal кладет children в этот registry, а PortalHost рендерит их у себя
-->

---
layout: full
---

<div class="flex flex-col items-start justify-center w-full h-full px-8 py-6 box-border leading-snug max-w-3xl gap-4">

<h2 class="!text-white !mt-0 !mb-0 text-2xl font-bold tracking-tight w-full text-left shrink-0">The illusion of portals</h2>

<ul class="!text-white text-lg font-normal opacity-90 space-y-3 list-disc pl-5 m-0 leading-relaxed">
<li>Выглядят как portal</li>
<li>Ощущаются как portal</li>
<li><strong>НО!</strong> React tree было изменено</li>
</ul>

</div>

<!--
Визуально это работает. Компонент действительно появляется в другом месте.
Но проблема в том, что это не настоящий portal в смысле web.
Мы фактически меняем место, где компонент рендерится в React tree.
Поэтому могут ломаться context, state continuity и predictable lifecycle.
-->

---
layout: full
---

<div class="flex flex-col justify-center w-full h-full px-8 py-6 box-border leading-snug gap-6">

<h2 class="!text-white !mt-0 !mb-0 text-2xl font-bold tracking-tight w-full text-left shrink-0">У React нет операции "переместить"</h2>

<div class="flex w-full justify-center">

<div class="flex w-full max-w-xs flex-col items-stretch gap-3">

<div class="flex w-full flex-col items-stretch gap-2">
<span class="rounded-lg border border-zinc-600 bg-zinc-800/90 px-3 py-2 text-center text-sm font-medium text-white">Parent A</span>
<span class="text-center text-xs uppercase tracking-wide text-white/45">move</span>
<span class="text-center text-lg leading-none text-white/45">↓</span>
<span class="rounded-lg border border-zinc-600 bg-zinc-800/90 px-3 py-2 text-center text-sm font-medium text-white">Parent B</span>
</div>

<div class="w-full py-1 text-center text-3xl font-light leading-none text-white/40">=</div>

<div class="flex w-full flex-col items-stretch gap-2">
<span class="rounded-lg border border-red-800/70 bg-red-950/45 px-3 py-2 text-center text-sm font-medium text-red-100">unmount from A</span>
<span class="text-center text-2xl font-light leading-none text-white/40">+</span>
<span class="rounded-lg border border-emerald-800/70 bg-emerald-950/45 px-3 py-2 text-center text-sm font-medium text-emerald-100">mount in B</span>
</div>

</div>

</div>

</div>

<!--
В React mental model нет операции move.
Если элемент был у одного parent, а потом должен оказаться у другого parent, React воспринимает это как delete + create.
Для простого View это не страшно.
Но для видео, карты, камеры или сложной анимации это уже заметно.
-->

---
layout: full
---

<div class="flex flex-col items-start justify-start w-full h-full px-8 pt-4 pb-6 box-border leading-snug max-w-4xl gap-5">

<h2 class="!text-white !mt-0 !mb-0 text-2xl font-bold tracking-tight w-full text-left shrink-0">Почему remount это действительно проблема</h2>

<div class="grid w-full grid-cols-2 gap-8 items-start pt-12">

<div class="min-w-0">
<h3 class="!text-white !mt-0 !mb-3 text-lg font-bold">Тяжелые UI компоненты</h3>
<ul class="!text-white text-base font-normal opacity-90 space-y-2 list-disc pl-5 m-0 leading-relaxed">
<li>Видео</li>
<li>Карта</li>
<li>Камера</li>
<li>WebView</li>
<li>High-res изображения</li>
<li>Анимированные стикеры</li>
</ul>
</div>

<div class="min-w-0">
<h3 class="!text-white !mt-0 !mb-3 text-lg font-bold">Последствия</h3>
<ul class="!text-white text-base font-normal opacity-90 space-y-2 list-disc pl-5 m-0 leading-relaxed">
<li>Мерцание</li>
<li>Черный кадр</li>
<li>Потеря буфера</li>
<li>Потеря позиции воспроизведения</li>
<li>Стоимость повторной инициализации</li>
</ul>
</div>

</div>

</div>

<!--
Когда пересоздается тяжелый native view, пользователь может увидеть flicker, black frame или loading state.
Для видео это особенно заметно: можно потерять buffer, playback position или получить паузу между inline и fullscreen состоянием.
-->

---
layout: full
---

<div class="grid h-full w-full grid-rows-[auto_1fr] px-8 py-6 box-border min-h-0 overflow-hidden gap-4">

<h2 class="!text-white !mt-0 !mb-0 text-2xl font-bold tracking-tight text-center shrink-0 whitespace-nowrap">Демо</h2>

<div class="flex min-h-0 items-center justify-center overflow-hidden">

<div class="aspect-[402/874] h-full max-h-full max-w-full w-auto shrink-0">

<video
  class="block h-full w-full cursor-pointer rounded-lg object-contain shadow-[0_12px_32px_rgba(0,0,0,0.45)]"
  src="../assets/react-teleport/bad-example.mp4"
  preload="metadata"
  playsinline
  loop
  @click="$event.currentTarget.paused ? $event.currentTarget.play() : $event.currentTarget.pause()"
/>

</div>

</div>

</div>

<!--
Для демонстрации я сделал Instagram-like feed.
Видео играет прямо в ленте.
Пользователь нажимает на него и ожидает, что оно просто раскроется в fullscreen — без рестарта, без black frame, без потери текущего таймкода.

Без Teleport типичная реализация выглядит так: мы нажимаем на video, открываем fullscreen screen, и там рендерится новый VideoPlayer.
Старый player из feed размонтируется, новый player создается.
Можно руками передать currentTime, но это workaround. Сам player все равно пересоздается.
-->

---
layout: full
---

<div class="flex flex-col items-start justify-start w-full h-full px-8 pt-4 pb-6 box-border leading-snug max-w-3xl gap-4">

<h2 class="!text-white !mt-0 !mb-0 text-2xl font-bold tracking-tight w-full text-left shrink-0">Почему просто сохранить currentTime не достаточно?</h2>

<p class="!text-white !mb-0 text-lg font-normal opacity-90 leading-relaxed text-left">Можно ли просто передать currentTime?</p>

<p class="!text-white !mb-0 text-lg font-normal opacity-90 leading-relaxed text-left">Да, но мы всё равно потеряем:</p>

<ul class="!text-white text-lg font-normal opacity-90 space-y-2 list-disc pl-5 m-0 leading-relaxed">
<li>экземпляр нативного плеера</li>
<li>буфер</li>
<li>внутреннее состояние</li>
<li>состояние анимаций</li>
<li>состояние жестов</li>
<li>уже декодированные кадры</li>
</ul>

</div>

<!--
Да, часть проблемы можно решить вручную: сохранить currentTime, передать его на новый экран и вызвать seek.
Но это не то же самое, что сохранить player.
Мы все равно пересоздаем native instance, заново инициализируем видео, можем потерять buffer и получить визуальный разрыв.
-->

---
layout: full
---

<div class="flex flex-col items-start justify-start w-full h-full px-8 pt-4 pb-6 box-border leading-snug max-w-4xl gap-5">

<h2 class="!text-white !mt-0 !mb-0 text-2xl font-bold tracking-tight w-full text-left shrink-0">Что Teleport меняет?</h2>

<div class="flex w-full flex-col gap-4">

<div class="grid w-full grid-cols-[10rem_1fr] items-center gap-x-4 rounded-lg border border-red-800/70 bg-red-950/45 px-5 py-4">
<strong class="text-lg leading-snug text-red-100">Без Teleport:</strong>
<span class="text-lg leading-snug opacity-90">создаётся новый полноэкранный видеоплеер</span>
</div>

<div class="grid w-full grid-cols-[10rem_1fr] items-center gap-x-4 rounded-lg border border-emerald-800/70 bg-emerald-950/45 px-5 py-4">
<strong class="text-lg leading-snug text-emerald-100">С Teleport:</strong>
<span class="text-lg leading-snug opacity-90">существующий нативный видеоплеер просто перемещается</span>
</div>

</div>

</div>

<!--
react-native-teleport меняет подход.
Он не просит React пересоздать компонент в другом месте.
React сохраняет ownership компонента, а native layer переносит view в другой container.
-->

---
layout: full
---

<div class="flex flex-col items-start justify-start w-full h-full px-8 pt-4 pb-6 box-border leading-snug max-w-5xl gap-4 min-h-0">

<h2 class="!text-white !mt-0 !mb-0 text-2xl font-bold tracking-tight w-full text-left shrink-0">Как выглядит Teleport API</h2>

<div class="flex w-max max-w-full flex-col gap-4 [&_pre]:!m-0 [&_pre]:!w-full [&_pre]:!text-sm">

```tsx {maxHeight:'220px'}
<PortalProvider>
  <App />

  <PortalHost name="fullscreen" />
</PortalProvider>
```

```tsx {maxHeight:'220px'}
<Portal hostName={isFullscreen ? "fullscreen" : "feed"}>
  <VideoPlayer source={video} />
</Portal>
```

</div>

</div>

<!--
API достаточно простой.
PortalProvider хранит portal infrastructure.
PortalHost — это destination, место куда можно перенести view.
Portal говорит: вот этот UI должен быть размещен в конкретном host.
-->

---
layout: full
---

<div class="grid h-full w-full grid-rows-[auto_1fr] px-8 py-6 box-border min-h-0 overflow-hidden gap-4">

<h2 class="!text-white !mt-0 !mb-0 text-2xl font-bold tracking-tight text-center shrink-0 whitespace-nowrap">Демо с teleport</h2>

<div class="flex min-h-0 items-center justify-center overflow-hidden">

<div class="aspect-[402/874] h-full max-h-full max-w-full w-auto shrink-0">

<video
  class="block h-full w-full cursor-pointer rounded-lg object-contain shadow-[0_12px_32px_rgba(0,0,0,0.45)]"
  src="../assets/react-teleport/good_example.mp4"
  preload="metadata"
  playsinline
  loop
  @click="$event.currentTarget.paused ? $event.currentTarget.play() : $event.currentTarget.pause()"
/>

</div>

</div>

</div>

<!--
В версии с Teleport fullscreen mode не создает новый player.
Мы меняем host, и тот же самый native video view переезжает в fullscreen container.
Playback продолжается, потому что ничего не было уничтожено.
-->

---
layout: full
---

<div class="flex flex-col items-start justify-start w-full h-full px-8 pt-4 pb-6 box-border leading-snug max-w-4xl gap-5">

<h2 class="!text-white !mt-0 !mb-0 text-2xl font-bold tracking-tight w-full text-left shrink-0">Requirements and trade-offs</h2>

<div class="grid w-full grid-cols-2 gap-8 items-start pt-2">

<div class="min-w-0">
<h3 class="!text-white !mt-0 !mb-3 text-lg font-bold">Requirements:</h3>
<ul class="!text-white text-base font-normal opacity-90 space-y-2 list-disc pl-5 m-0 leading-relaxed">
<li>React Native New Architecture / Fabric</li>
<li>Native rebuild</li>
<li>Custom dev client for Expo</li>
<li>Careful host architecture</li>
</ul>
</div>

<div class="min-w-0">
<h3 class="!text-white !mt-0 !mb-3 text-lg font-bold">Trade-offs:</h3>
<ul class="!text-white text-base font-normal opacity-90 space-y-2 list-disc pl-5 m-0 leading-relaxed">
<li>More complex mental model</li>
<li>Not needed for simple overlays</li>
<li>Young ecosystem</li>
</ul>
</div>

</div>

</div>

<!--
У библиотеки есть цена.
Она требует New Architecture / Fabric, native rebuild, а в Expo — custom dev client.
Для простых popups это может быть overengineering.
Но для heavy live UI — видео, карты, preview, сложные transitions — это уже имеет смысл.
-->

---
layout: full
---

<div class="flex flex-col items-start justify-start w-full h-full px-8 pt-4 pb-6 box-border leading-snug max-w-3xl gap-4">

<h2 class="!text-white !mt-0 !mb-0 text-2xl font-bold tracking-tight w-full text-left shrink-0">React Native Teleport:</h2>

<ul class="!text-white text-lg font-normal opacity-90 space-y-3 list-disc pl-5 m-0 leading-relaxed">
<li>Сохраняет React-дерево без изменений</li>
<li>Перемещает нативное представление между контейнерами</li>
<li>Избегает повторного монтирования компонента</li>
<li>Сохраняет текущее состояние UI</li>
<li>Обеспечивает более плавное взаимодействие на разных платформах</li>
</ul>

</div>

<!--
Главная идея Teleport — добавить missing primitive: move UI.
React обычно умеет create, update и delete.
Teleport позволяет на native level сделать move.
Поэтому мы можем строить interactions, которые раньше требовали костылей, пересоздания UI или платформенных API.
-->
