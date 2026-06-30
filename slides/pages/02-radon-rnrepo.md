---
layout: full
---

<div class="flex flex-col items-center justify-center w-full h-full p-8 box-border text-center leading-snug max-w-2xl mx-auto">

<h1 class="!text-white !mt-0 !mb-3 text-3xl font-bold">Radon IDE</h1>

<h2 class="!text-white !mt-0 !mb-0 text-lg font-normal opacity-90">Обертка над эмулятором в VSCode/Cursor</h2>

</div>

<!--
Первая тема о которой хочу рассказать - radon IDE. Познакомились с ним еще в прошлом году, когда ездили на эту же конференцию и он сильно упростил жизнь за это время.
-->

---
layout: full
---

<div class="relative w-full h-full p-3 box-border">

<img src="../assets/radon/preview.png" class="absolute inset-3 w-[calc(100%-1.5rem)] h-[calc(100%-1.5rem)] rounded-lg object-cover object-center" alt="" />

<div class="absolute left-5 top-1/2 -translate-y-1/2 z-10 w-[44%] max-w-xl p-5 rounded-xl bg-black/88 text-white shadow-2xl leading-snug">

<h2 class="!text-white !mt-0 !mb-3 text-xl font-bold whitespace-nowrap">Превью в редакторе</h2>

<ul class="!text-white text-sm space-y-2 list-disc pl-4 m-0">
<li><strong>Встроенное превью</strong> — iOS Simulator и Android emulator внутри Cursor / VS Code</li>
<li><strong>Сборки под капотом</strong> — Radon сам собирает под эмулятор</li>
</ul>

</div>

</div>

<!--
Не отдельная IDE.
Надстройка над эмуляторами IOS и Android.
Умеет сам собирать билды на нужную платформу при запуске
-->

---
layout: full
---

<div class="relative w-full h-full p-4 box-border">

<div class="absolute left-5 top-1/2 -translate-y-1/2 z-10 w-[36%] max-w-md p-5 leading-snug">

<h2 class="!text-white !mt-0 !mb-3 text-xl font-bold">Несколько эмуляторов</h2>

<ul class="!text-white text-sm space-y-2 list-disc pl-4 m-0">
<li>Переключение <strong>iOS и Android</strong> в одном окне редактора</li>
<li>Выбор устройства без отдельных окон Simulator</li>
<li>Быстрый контекст устройства для вёрстки и платформенных нюансов</li>
</ul>

</div>

<img src="../assets/radon/multi-emulator.png" class="absolute right-4 top-1/2 -translate-y-1/2 max-h-[calc(100%-2rem)] w-auto max-w-[58%] object-contain rounded-lg" alt="" />

</div>

<!--
Радон позволяет запустить сразу с несколько эмуляторов. Единственное ограничение сейчас - нельзя одновременно показать сразу несколько девайсов.
-->

---
layout: full
---

<div class="relative w-full h-full p-4 box-border">

<div class="absolute left-5 top-1/2 -translate-y-1/2 z-10 w-[36%] max-w-md p-5 leading-snug">

<h2 class="!text-white !mt-0 !mb-3 text-xl font-bold whitespace-nowrap">Inspect → source</h2>

<ul class="!text-white text-sm space-y-2 list-disc pl-4 m-0">
<li><strong>Inspect по правому клику</strong> на превью</li>
<li>Переход из UI в <strong>стек компонентов и исходный файл</strong></li>
<li>Быстрее ориентироваться в незнакомом коде</li>
</ul>

</div>

<img src="../assets/radon/inspect.png" class="absolute right-4 top-1/2 -translate-y-1/2 max-h-[calc(100%-2rem)] w-auto max-w-[58%] object-contain rounded-lg" alt="" />

</div>

<!--
Правый клик по любому элементу на эмуляторе позволяет быстро перейти к его коду. Это упрощает навигацию и позволяет быстрее разобраться в чужом коде
-->

---
layout: full
---

<div class="grid grid-rows-[auto_1fr] w-full h-full p-4 gap-3 box-border">

<div class="p-5 leading-snug">

<h2 class="!text-white !mt-0 !mb-3 text-xl font-bold">Сетевой инспектор</h2>

<ul class="!text-white text-sm space-y-1 list-disc pl-4 m-0">
<li><strong>HTTP / fetch</strong> — стабильнее, чем базовые Expo Dev Tools</li>
<li>Запросы <strong>в редакторе</strong>, рядом с кодом</li>
<li>Отладка реальных API в бизнес-приложениях</li>
</ul>

</div>

<div class="flex items-end justify-center min-h-0 overflow-hidden">

<img src="../assets/radon/network.png" class="w-full max-h-full object-contain object-bottom rounded-lg" alt="" />

</div>

</div>

<!--
В экспо часто проблемы с нетворк инспектором, он открывается в чемто вроде хром дев тулс, и не всегда реагирует на запросы. В радоне этот функционал стабилен, и встроен прямо в ИДЕ
-->

---
layout: full
---

<div class="relative w-full h-full p-3 box-border">

<img src="../assets/radon/debug.png" class="absolute inset-3 w-[calc(100%-1.5rem)] h-[calc(100%-1.5rem)] rounded-lg object-cover object-center" alt="" />

<div class="absolute left-1/2 -translate-x-1/2 top-5 z-10 w-[40%] max-w-lg px-4 py-4 rounded-xl bg-black/88 text-white shadow-2xl leading-snug">

<h2 class="!text-white !mt-0 !mb-2 text-xl font-bold text-center">Отладчик</h2>

<ul class="!text-white text-sm space-y-1 list-disc pl-4 m-0">
<li><strong>Breakpoint'ы end-to-end</strong> — ставим в коде, пауза в эмуляторе</li>
<li><strong>Call stack и variables</strong> — в том же окне, без Chrome DevTools</li>
<li><strong>Между экранами</strong> — навигация не рвёт сессию отладки</li>
</ul>

</div>

</div>

<!--
Наконец-то есть нормальная возможность дебага кода прямо в иде. Ставим брейкпойнты, смотрим переменные и коллстек, все в лучших традициях бакэнд дебага
-->

---
layout: full
---

<div class="relative w-full h-full p-4 box-border">

<div class="absolute left-5 top-1/2 -translate-y-1/2 z-10 w-[36%] max-w-md p-5 leading-snug">

<h2 class="!text-white !mt-0 !mb-3 text-xl font-bold">Встроенные инструменты</h2>

<ul class="!text-white text-sm space-y-2 list-disc pl-4 m-0">
<li><strong>Address bar</strong>, <strong>deep links</strong>, <strong>биометрия</strong> — дополнительные возможности в эмуляторе</li>
<li><strong>Запись экрана</strong> — багрепорты и handoff в QA</li>
<li><strong>TanStack DevTools</strong> из коробки</li>
</ul>

</div>

<img src="../assets/radon/built-in-tools.png" class="absolute right-4 top-1/2 -translate-y-1/2 max-h-[calc(100%-2rem)] w-auto max-w-[58%] object-contain rounded-lg" alt="" />

</div>

<!--
У радона есть куча встроенных инструментов для упрощения работы с часто используемым функционалом. Можно вручную навигироваться на люьбой экран, открывать дип линки. Есть поддержка тестирования биометрии прямо в эмуляторе, запись экрана, а также нативная поддержка tanstack dev tools
-->

---
layout: full
---

<div class="flex flex-col gap-3 w-full h-full p-4 box-border">

<div class="grid grid-cols-[1fr_auto] gap-6 items-center flex-1 min-h-0">

<div class="p-5 leading-snug min-w-0">

<h2 class="!text-white !mt-0 !mb-2 text-xl font-bold whitespace-nowrap">Агенты + MCP</h2>

<p class="!text-white !mb-3 text-sm"><strong>Radon AI</strong> — MCP-сервер в Cursor / VS Code</p>

<ul class="!text-white text-sm space-y-1.5 list-disc pl-4 m-0">
<li><strong>Скриншот и component tree</strong></li>
<li><strong>Логи и network requests</strong></li>
<li><strong>Документация RN / Expo</strong></li>
<li><strong>Reload приложения</strong></li>
</ul>

</div>

<img src="../assets/radon/mcp-tools.png" class="max-h-[58vh] w-auto max-w-[260px] object-contain rounded-lg shadow-lg shrink-0" alt="" />

</div>

<div class="px-4 py-2.5 shrink-0">

<div class="flex items-center gap-5 text-sm">

<span class="!text-white text-[11px] opacity-50 uppercase tracking-wide shrink-0">Пример</span>

<div class="flex items-center justify-between flex-1 gap-2 min-w-0">

<span class="!text-white whitespace-nowrap"><span class="opacity-45">1 ·</span> <strong>Figma</strong> — читаем макет</span>

<span class="!text-white opacity-30 shrink-0">→</span>

<span class="!text-white whitespace-nowrap"><span class="opacity-45">2 ·</span> <strong>Код</strong> — правим UI</span>

<span class="!text-white opacity-30 shrink-0">→</span>

<span class="!text-white whitespace-nowrap"><span class="opacity-45">3 ·</span> <strong>Radon</strong> — скриншот, сверка</span>

</div>

</div>

</div>

</div>

<!--
Кроме того из коробки есть функционал связи с AI агентами через mcp сервер. он позволяет аишке смотреть скрины прямо с эмулятора, читать логи, нетворк, а также агент может сам посмотреть докуметацию реакт рейтива. В заключении хочу отметить что тул оказался очень полезным и сильно упросил мне процесс разработки.
-->

---
layout: full
---

<div class="flex flex-col items-center justify-center w-full h-full p-8 box-border text-center leading-snug max-w-2xl mx-auto">

<h1 class="!text-white !mt-0 !mb-3 text-3xl font-bold">RNRepo</h1>

<h2 class="!text-white !mt-0 !mb-0 text-lg font-normal opacity-90">Готовые нативные артефакты для популярных RN-библиотек</h2>

</div>

<!--
Перед тем как передать слово Мише - хотелось бы еще упомянуть такую полозную вещь как Rnrepo.
-->

---
layout: full
---

<div class="relative w-full h-full p-3 box-border">

<img src="../assets/radon-eas-rnrepo.png" class="absolute inset-3 w-[calc(100%-1.5rem)] h-[calc(100%-1.5rem)] rounded-lg object-cover object-center" alt="" />

<div style="position: absolute; left: 0.75rem; right: 0.75rem; top: 59.5%; height: 1px; background: #ef4444; z-index: 10;"></div>

<div class="absolute right-5 top-5 z-10 w-[38%] max-w-md p-5 rounded-xl bg-black/88 text-white shadow-2xl leading-snug">

<h2 class="!text-white !mt-0 !mb-3 text-xl font-bold">RNRepo</h2>

<p class="!text-white !mb-3 text-sm">Готовые нативные артефакты для популярных RN-библиотек</p>

<ul class="!text-white text-sm space-y-1 list-disc pl-4 m-0">
<li><code class="text-xs">@rnrepo/expo-config-plugin</code> · <code class="text-xs">@rnrepo/build-tools</code></li>
<li>Ускорение <strong>EAS-сборок</strong> на Android</li>
<li><strong>~2 мин на setup</strong> — окупается на каждом CI-прогоне</li>
<li><strong>Beta</strong> · только <strong>New Architecture</strong></li>
</ul>

</div>

<div class="absolute left-1/2 -translate-x-1/2 z-10 px-3 py-1.5 rounded-md bg-black/88 text-white/90 shadow-lg text-center text-xs leading-tight" style="top: calc(59.5% + 0.5rem);">

<div>Подключили RNRepo</div>

<div>~30м → ~20м</div>

</div>

</div>

<!--
Rnrepo - это репозиторий готовых артефактов популярных библиотек для Expo React Native. Что это значит - по сути когда мы билдим наше приложение - нам не нужно больше собирать эти библиотеки с нуля, так как РНрепо предоставляет нам прекомпилированные версии этих библиотек. На нашем проекте карренси это позволило скинуть целых 10 минут с анроид билда, а настраивается всего за пару минут.
-->
