---
layout: full
---

<div class="flex items-center justify-center w-full h-full p-8 box-border bg-[#1e1e1e]">

<div class="max-w-2xl p-8 rounded-xl bg-black/88 text-white shadow-2xl text-center leading-snug">

<h1 class="!text-white !mt-0 !mb-3 text-3xl font-bold">Render Once:</h1>

<h2 class="!text-white !mt-0 !mb-4 text-lg font-normal opacity-90">Новый подход к архитектуре React Native приложений с Legend-State</h2>

<p class="!text-white !mb-0 text-sm opacity-70">Сегмент 1</p>

</div>

</div>


---
layout: full
---

<div class="relative w-full h-full p-3 box-border">

<h2 class="!text-white !mt-0 !mb-3 text-xl font-bold">Почему современные React Native приложения все еще тормозят?</h2>

<ul class="!text-white text-sm space-y-2 list-disc pl-4 m-0">
<li><strong>Cлишком много ререндеров</strong></li>
<li><strong>Большие render tree</strong></li>
<li><strong>React используется как оркестратор вообще всего</strong></li>
</ul>

</div>


---
layout: full
---

<div class="relative w-full h-full p-3 box-border">

<h2 class="!text-white !mt-0 !mb-3 text-xl font-bold">Цена render</h2>

<ul class="!text-white text-sm space-y-2 list-disc pl-4 m-0">
<li><strong>State propagation</strong></li>
<li><strong>Context</strong></li>
<li><strong>Effects</strong></li>
<li><strong>Hooks</strong></li>
<li><strong>Subscriptions</strong></li>
<li><strong>Query updates</strong></li>
<li><strong>UI updates</strong></li>
</ul>

</div>


---
layout: full
---

<div class="relative w-full h-full p-3 box-border flex flex-1 flex-col gap-4">

<h2 class="!text-white !mt-0 !mb-3 text-xl font-bold">Что стало в React Native быстрее?</h2>

<ul class="!text-white text-sm space-y-2 list-disc pl-4 m-0 flex flex-1 flex-col">
<li><strong>New Architecture</strong></li>
<li><strong>Hermes</strong></li>
<li><strong>Nitro Modules</strong></li>
<li><strong>Reanimated</strong></li>
<li><strong>Legend List</strong></li>
<li><strong>Skia</strong></li>
<li><strong>Keyboard Controller</strong></li>
</ul>

<h2 class="!text-white !mt-0 !mb-3 text-xl font-bold">Что осталось bottleneck?</h2>

<ul class="!text-white text-sm space-y-2 list-disc pl-4 m-0 flex flex-1 flex-col">
<li><strong>App State</strong></li>
</ul>

</div>

---
layout: full
---

<div class="relative w-full h-full p-3 box-border flex flex-1 flex-col gap-4">

<h2 class="!text-white !mt-0 !mb-3 text-xl font-bold">Что стало в React Native быстрее?</h2>

<ul class="!text-white text-sm space-y-2 list-disc pl-4 m-0 flex flex-1 flex-col">
<li><strong>New Architecture</strong></li>
<li><strong>Hermes</strong></li>
<li><strong>Nitro Modules</strong></li>
<li><strong>Reanimated</strong></li>
<li><strong>Legend List</strong></li>
<li><strong>Skia</strong></li>
<li><strong>Keyboard Controller</strong></li>
</ul>

<h2 class="!text-white !mt-0 !mb-3 text-xl font-bold">Что осталось bottleneck?</h2>

<ul class="!text-white text-sm space-y-2 list-disc pl-4 m-0 flex flex-1 flex-col">
<li><strong>App State</strong></li>
</ul>

</div>

---
layout: full
---

<div class="relative w-full h-full p-3 box-border flex flex-1 flex-col gap-4 items-center justify-center">

<img src="../assets/legend-state/chat.png" class="max-h-[calc(100%-2rem)] w-auto max-w-[58%] object-contain rounded-lg"/>

</div>

---
layout: full
---

<div class="relative w-full h-full p-3 box-border flex flex-1 flex-col gap-4 items-center justify-start">

<h2 class="!text-white !mt-0 !mb-3 text-xl font-bold">Что говорит документация React?</h2>

<article class="w-full max-w-4xl rounded-xl bg-[#23272f] px-8 py-10 shadow-2xl">
    <div class="mb-8 flex items-center justify-between gap-4">
      <nav class="flex flex-wrap items-center gap-1 text-xs font-semibold uppercase tracking-wide text-[#58c4dc]">
        <span>Learn React</span>
        <span class="opacity-70">&gt;</span>
        <span>Managing State</span>
        <span class="opacity-70">&gt;</span>
      </nav>
    </div>
    <h1 class="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl">
      Sharing State Between Components
    </h1>
    <p class="!opacity-100 max-w-3xl text-lg leading-relaxed text-[#d6deeb] [&_span]:!text-white">
      Sometimes, you want the state of two components to always change together.
      To do it, remove state from both of them, move it to their closest common parent,
      and then pass it down to them via props. This is known as
      <span class="!text-white font-bold not-italic">lifting state up</span>,
      and it's one of the most common things you will do writing React code.
    </p>
  </article>

</div>

---
layout: full
---

<div class="relative w-full h-full p-3 box-border flex flex-1 flex-col gap-4 items-center justify-start">

<h2 class="!text-white !mt-0 !mb-2 text-xl font-bold">Общий state</h2>

```tsx {maxHeight:'360px'}
function ChatScreen() {
  const [replyId, setReplyId] = useState('')

  return (
    <View>
      <ChatMessages replyId={replyId} />
      <ChatComposer replyId={replyId} />
    </View>
  )
}
```

</div>

---
layout: full
---

<div class="relative w-full h-full p-3 box-border flex flex-1 flex-col gap-4 items-center justify-start">

<h2 class="!text-white !mt-0 !mb-2 text-xl font-bold">Изменение общего state</h2>



</div>