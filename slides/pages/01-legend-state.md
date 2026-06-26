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

<style>
.chat-tree-box {
  border-style: solid;
  border-width: 1px;
  border-color: rgb(52 152 219 / 0);
  animation: chat-tree-border-pulse 1.5s ease-in-out infinite;
}

@keyframes chat-tree-border-pulse {
  0%, 100% {
    border-color: rgb(52 152 219 / 0);
    box-shadow: 0 0 0 0 rgb(52 152 219 / 0);
  }
  50% {
    border-color: rgb(52 152 219 / 1);
    box-shadow: 0 0 10px 0 rgb(52 152 219 / 0.35);
  }
}
</style>

<div class="relative w-full h-full p-3 box-border flex flex-col gap-2 items-center justify-start min-h-0 overflow-hidden">

<h2 class="!text-white !mt-0 !mb-1 text-xl font-bold shrink-0">Изменение общего state</h2>

<div class="flex w-full max-w-3xl flex-col items-center gap-2">

<div class="chat-tree-box rounded-lg bg-[#1a1a1a] px-5 py-2 text-xs font-medium text-white text-center min-w-[120px]">ChatScreen</div>

<div class="grid w-full grid-cols-3 items-start gap-3">

<div class="flex flex-col gap-2">
<div class="chat-tree-box rounded-lg bg-[#1a1a1a] px-3 py-2 text-xs font-medium text-white text-center">ChatMessages</div>
<div class="flex flex-col gap-1">
<div class="chat-tree-box rounded-lg bg-[#1a1a1a] px-3 py-2 text-xs text-white text-center">Message</div>
<div class="chat-tree-box rounded-lg bg-[#1a1a1a] px-3 py-2 text-xs text-white text-center">Message</div>
<div class="chat-tree-box rounded-lg bg-[#1a1a1a] px-3 py-2 text-xs text-white text-center">Message</div>
<div class="chat-tree-box rounded-lg bg-[#1a1a1a] px-3 py-2 text-xs text-white text-center">Message</div>
</div>
</div>

<div class="flex flex-col gap-2">
<div class="chat-tree-box rounded-lg bg-[#1a1a1a] px-3 py-2 text-xs font-medium text-white text-center">ChatComposer</div>
<div class="flex flex-col gap-1">
<div class="chat-tree-box rounded-lg bg-[#1a1a1a] px-3 py-2 text-xs text-white text-center">ReplyRow</div>
<div class="chat-tree-box rounded-lg bg-[#1a1a1a] px-3 py-2 text-xs text-white text-center">InputRow</div>
</div>
</div>

<div class="flex flex-col gap-2">
<div class="chat-tree-box rounded-lg bg-[#1a1a1a] px-3 py-2 text-xs font-medium text-white text-center">useEffects</div>
</div>

</div>

</div>

</div>

---
layout: full
---

<div class="relative w-full h-full p-3 box-border flex flex-1 flex-col gap-4 items-center justify-center">
  <h2 class="!text-white !mt-0 !mb-2 text-xl font-bold">React Compiler!</h2>
</div>

---
layout: full
---

<div class="relative w-full h-full p-3 box-border flex flex-1 flex-col gap-4 items-center justify-center">

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

<div class="relative w-full h-full p-3 box-border flex flex-1 flex-col gap-4 items-center justify-center">

```tsx {maxHeight:'360px'}
function ChatScreen() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal()
    }
  }, [isOpen])

  return (
    <Pressable onPress={() => setIsOpen(true)} />
  )
}
```

</div>


---
layout: full
---

<div class="relative w-full h-full p-3 box-border flex flex-1 flex-col gap-4 items-center justify-center">

```tsx {maxHeight:'360px'}
function ChatScreen() {
  const [isPaused, setIsPaused] = useState(false)

  const { data } = useQuery({
    queryKey,
    refetchInterval: isPaused ? false : 1000
  })
}
```

</div>

---
layout: full
---

<div class="relative w-full h-full p-3 box-border flex flex-1 flex-col gap-4 items-center justify-center">

```tsx {maxHeight:'360px'}
function ChatScreen() {
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      markConversationRead(conversationId)
    }
  }, [isFocused, conversationId])
}
```

</div>

---
layout: full
---

<div class="relative w-full h-full p-3 box-border flex flex-1 flex-col gap-4 items-start">
  <h2 class="!text-white !mt-0 !mb-2 text-xl font-bold">Render для координации</h2>
  <p>
  И проблема именно в этом! В том, что механизм рендера используется для координации логики, которая вообще не связана с отображением UI. В результате мы расходуем вычислительные ресурсы на лишние рендеры лишь для того, чтобы запускать побочные эффекты (useEffect) и синхронизировать состояние между частями приложения.
  </p>
</div>

---
layout: full
---

<div class="relative w-full h-full p-3 box-border flex flex-1 flex-col gap-4 items-center justify-center">

```tsx {1-12|4-7}{maxHeight:'360px'}
function Component() {
  const [value, setValue] = useState(0)

  const onPress = useCallback(() => {
    console.log(value);
    setValue(v => v + 1)
  }, [])

  return (
    <BigComponent onPress={onPress} />
  )
}
```

</div>

---
layout: full
---

<div class="relative w-full h-full p-3 box-border flex flex-1 flex-col gap-4 items-center justify-center">

```tsx {maxHeight:'360px'}
function Component() {
  const [value, setValue] = useState(0)

  const onPress = useCallback(() => {
    console.log(value);
    setValue(v => v + 1)
  }, [value])

  return (
    <BigComponent onPress={onPress} />
  )
}
```

</div>

---
layout: full
---

<div class="relative w-full h-full p-3 box-border flex flex-1 flex-col gap-4 items-center justify-center">

<h2 class="!text-white !mt-0 !mb-2 text-xl font-bold">Render once</h2>

</div>