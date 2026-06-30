---
layout: full
---

<div class="flex flex-col items-center justify-center w-full h-full p-8 box-border text-center leading-snug max-w-2xl mx-auto">

<h1 class="!text-white !mt-0 !mb-3 text-3xl font-bold">keyframer.dev</h1>

<h2 class="!text-white !mt-0 !mb-0 text-lg font-normal opacity-90">Графический редактор анимаций Reanimated</h2>

</div>

<!--
В прошлом году мы на проекте карренси делали достаточно сложные анимации, Дизайнер в Фигме рисовал что он хочет видеть в приложении, а я переносил это в код. Те кто знаком работал с анимациями знает на сколько это может быть долгий и неудобный процесс. Особенно в реакт нейтив, где нельзя просто заэкспортить CSS анимацию из фигмы и вставить в код. На конференции в этом году показали интересный проект который может успростить эту задачу и называется он Keyframer
-->

---
layout: full
---

<div class="relative w-full h-full p-4 box-border">

<div class="absolute left-5 top-1/2 -translate-y-1/2 z-10 w-[36%] max-w-md p-5 leading-snug">

<h2 class="!text-white !mt-0 !mb-3 text-xl font-bold">Timeline</h2>

<ul class="!text-white text-sm space-y-2 list-disc pl-4 m-0">
<li><strong>Keyframes</strong> на треках — как в After Effects</li>
<li><strong>Easing</strong> между кадрами — кривая ускорения и замедления</li>
<li>Несколько свойств параллельно (opacity, scale, position)</li>
</ul>

</div>

<img src="../assets/keyframer/editor-timeline.png" class="absolute right-4 top-1/2 -translate-y-1/2 max-h-[calc(100%-2rem)] w-auto max-w-[58%] object-contain rounded-lg" alt="" />

</div>

<!--
Инструмент умеет работать в 2 режимах, первый из них - Timeline. Те, кто использовали After Effects или ему подобные редакторы наверное сразу узнают интерфейс. Делаем кейфреймы, в них двигаем объекты, в то состояние, в котором они должны находиться в этом фрейме, настраиваем переход - готово.
-->

---
layout: full
---

<div class="relative w-full h-full p-4 box-border">

<div class="absolute left-5 top-1/2 -translate-y-1/2 z-10 w-[36%] max-w-md p-5 leading-snug">

<h2 class="!text-white !mt-0 !mb-3 text-xl font-bold">Node Graph</h2>

<ul class="!text-white text-sm space-y-2 list-disc pl-4 m-0">
<li><strong>Жесты и события</strong> → значения анимации</li>
<li>Значения → <strong>стили на экране</strong> (Animated Style)</li>
<li>Для <strong>интерактивных</strong> анимаций — пружины, последовательности, интерполяция</li>
</ul>

</div>

<img src="../assets/keyframer/editor-graph.png" class="absolute right-4 top-1/2 -translate-y-1/2 max-h-[calc(100%-2rem)] w-auto max-w-[58%] object-contain rounded-lg" alt="" />

</div>

<!--
2й режим для более сложных и детальных анимаций, node graph, тут интерфейс больше похож на Blueprint из Unreal Engine. Можно детально настраивать все параметры анимации, подключать ввод пользователя, например тут на скрине показан пример перетаскивания объекта.
-->

---
layout: full
---

<div class="relative w-full h-full p-4 box-border">

<div class="absolute left-5 top-1/2 -translate-y-1/2 z-10 w-[36%] max-w-md p-5 leading-snug">

<h2 class="!text-white !mt-0 !mb-3 text-xl font-bold">Export · Generated Code</h2>

<ul class="!text-white text-sm space-y-2 list-disc pl-4 m-0">
<li>Генерирует хук <code class="text-xs">useAnimatedScene()</code> — keyframes, <code class="text-xs">useAnimatedStyle</code>, жесты</li>
<li>В проде <strong>не вставляем как есть</strong> — берём и адаптируем нужные куски</li>
<li>Стартовая точка: keyframes, интерполяция, pan — в свой layout и код</li>
</ul>

</div>

<img src="../assets/keyframer/editor-export.png" class="absolute right-4 top-1/2 -translate-y-1/2 max-h-[calc(100%-2rem)] w-auto max-w-[58%] object-contain rounded-lg" alt="" />

</div>

<!--
На выходе мы получаем готовый код, который можно запустить в приложении. Не скажу что он идеален, но целом - взять оттуда отдельные куски со значениями анимации может сильно ускорить процесс. Этот тул можно использовать на пару с дизайнером - он рисует то что хочет увидеть в знакомом UI и сразу смотрит на результат со всей спецификой реакт нейтива, а разработчик получает заготовку анимации, которую можно переносить в проект, может и не в полном объеме.
-->

---
layout: full
---

<div class="flex flex-col justify-center w-full h-full p-8 box-border max-w-2xl leading-snug">

<h2 class="!text-white !mt-0 !mb-3 text-xl font-bold">Alpha · ограничения</h2>

<ul class="!text-white text-sm space-y-2 list-disc pl-4 m-0">
<li>Инструмент в <strong>alpha</strong> — сырой, функции и интерфейс ещё меняются</li>
<li><strong>Нет публичной документации</strong> — главный ориентир changelog на keyframer.dev</li>
<li>Подходит для <strong>простых сценариев</strong> — входная анимация, базовые жесты</li>
<li>Автор — <strong>Catalin Miron</strong> (AnimateReactNative.com): годами строит продукты и обучение на Reanimated — можно ждать полноценный редактор</li>
</ul>

</div>

<!--
Я планировал реализовать через keyframer анимацию, с которой мы мучались в прошлом году, но на данный момент тул очень сырой, особенно когда нужны кастомные переходы, отсутствие документации как таковой тоже не упрощает жизнь. Но есть надежда что в будущем получится удобный инструмент для коллаборации.
-->
