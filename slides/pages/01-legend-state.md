---
layout: full
---

<div class="flex flex-col items-center justify-center w-full h-full p-8 box-border text-center leading-snug max-w-2xl mx-auto">

<h1 class="!text-white !mt-0 !mb-3 text-3xl font-bold">Render Once:</h1>

<h2 class="!text-white !mt-0 !mb-0 text-lg font-normal opacity-90">Новый подход к архитектуре React Native приложений с Legend-State</h2>

</div>

<!--
Теперь я хочу вам рассказать о том, с какими проблемами оптимизации мы сталкиваемся в Реакт Нейтиве на сегодняшний день, и как это можно исправить
-->

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

<!--
И в первую очередь нужно задуматься почему современные приложения написаные на реакт нейтив все еще тормозят? Причина очень проста - слишком много ререндеров, большие деревья компонентов и реакт является оркестратором вообще всего
-->

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

<!--
Почему это может быть проблемой? В первую очередь потому что на каждый рендер выполняется прокидывание стейта, инициализация контекста, вызов сайд эффектов и хуков, ну и сам апдейт ui, что само по себе является дорогостоящей операцией
-->

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

<h2 v-click class="!text-white !mt-0 !mb-3 text-xl font-bold">Что осталось bottleneck?</h2>

<ul v-click class="!text-white text-sm space-y-2 list-disc pl-4 m-0 flex flex-1 flex-col">
<li><strong>App State</strong></li>
</ul>

</div>

<!--
На сегодняшний день появилось очень много инструментов, которые хорошо оптимизироваными, что делает наше приложение быстрее. Однако вопрос все еще открыт, почему же наши приложения все еще тормозят.

Что остается боттлнеком? Ответ очень просто - стейт
-->

---
layout: full
---

<div class="relative w-full h-full p-3 box-border flex flex-1 flex-col gap-4 items-center justify-center">

<img src="../assets/legend-state/chat.png" class="max-h-[calc(100%-2rem)] w-auto max-w-[58%] object-contain rounded-lg"/>

</div>

<!--
Представим что мы разрабатываем чат приложение, и у нас есть функционал: ответить на сообщение. Когда мы выбираем сообщение, на которое хотим ответить - цвет этого сообщения меняется на акцентный. В этот момент у нас обновляется стейт. Также в reply row нужно знать id сообщения, на которое мы хотим ответить. Что-же предлагает нам документация реакта для подобной ситуации, когда нескольким компонентам нужно знать одни и те же данные?
-->

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

<!--
Документация реакта нам предлагает вынести эти данные в стейт выше стоящего компонента
-->

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

---
layout: full
---

<div class="relative w-full h-full p-3 box-border flex flex-1 flex-row gap-4">

  <div class="flex flex-1 items-start flex-col">
    <h2 class="!text-white !mt-0 !mb-2 text-xl font-bold">Stable State Objects</h2>

  ```tsx {maxHeight:'360px'}
  function Component() {
    const replyId$ = useObservable('')
    const replyId = useValue(replyId$)
  }
  ```
</div>

<div v-click class="flex flex-col">
  <h2 class="!text-white !mt-0 !mb-2 text-xl font-bold">Так же известные как:</h2>

  <div class="flex">
    <ul class="!text-white text-sm space-y-2 list-disc pl-4 m-0 flex flex-1 flex-col">
      <li><strong>Signals</strong></li>
      <li><strong>Observables</strong></li>
      <li><strong>Shared Values (Reanimated)</strong></li>
    </ul>
  </div>
</div>
</div>

---
layout: full
---

<div class="relative w-full h-full p-3 box-border flex flex-1 flex-row gap-4">

  <div class="flex flex-1 items-start flex-col">
    <h2 class="!text-white !mt-0 !mb-2 text-xl font-bold">
      Ключевые особенности Observable
    </h2>
    <ul class="!text-white text-sm space-y-2 list-disc pl-4 m-0 flex flex-1 flex-col">
      <li><strong>Не подписывается на состояние</strong> — только создает Observable.</li>
      <li><strong>Подписка происходит отдельно</strong> — любой компонент может использовать <code>useValue()</code> или <code>observer()</code>.</li>
      <li><strong>Разделяет Ownership и Subscription</strong> — компонент может владеть состоянием, не являясь его подписчиком.</li>
      <li><strong>Поддерживает стабильные ссылки (Stable References)</strong> — Observable не меняет свою ссылку при обновлении.</li>
      <li><strong>Позволяет переносить подписки вниз по дереву</strong> — обновляются только компоненты, которым действительно нужны данные.</li>
      <li><strong>Минимизирует ререндеры</strong> — большие контейнерные компоненты могут вообще не ререндериться.</li>
    </ul>
  </div>
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

<h2 class="!text-white !mt-0 !mb-1 text-xl font-bold shrink-0">При классическом подходе ререндерится весь экран</h2>

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

<style>
.chat-tree-box {
  border-style: solid;
  border-width: 1px;
  border-color: transparent;
}

.chat-tree-box--pulse {
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
<h2 class="!text-white !mt-0 !mb-1 text-xl font-bold shrink-0 text-center">При использовании Observable ререндерятся только нужные компоненты</h2>
<div class="flex w-full max-w-3xl flex-col items-center gap-2">
<div class="chat-tree-box rounded-lg bg-[#1a1a1a] px-5 py-2 text-xs font-medium text-white text-center min-w-[120px]">ChatScreen</div>
<div class="grid w-full grid-cols-3 items-start gap-3">
<div class="flex flex-col gap-2">
<div class="chat-tree-box rounded-lg bg-[#1a1a1a] px-3 py-2 text-xs font-medium text-white text-center">ChatMessages</div>
<div class="flex flex-col gap-1">
<div class="chat-tree-box rounded-lg bg-[#1a1a1a] px-3 py-2 text-xs text-white text-center">Message</div>
<div class="chat-tree-box chat-tree-box--pulse rounded-lg bg-[#1a1a1a] px-3 py-2 text-xs text-white text-center">Message</div>
<div class="chat-tree-box rounded-lg bg-[#1a1a1a] px-3 py-2 text-xs text-white text-center">Message</div>
<div class="chat-tree-box rounded-lg bg-[#1a1a1a] px-3 py-2 text-xs text-white text-center">Message</div>
</div>
</div>
<div class="flex flex-col gap-2">
<div class="chat-tree-box rounded-lg bg-[#1a1a1a] px-3 py-2 text-xs font-medium text-white text-center">ChatComposer</div>
<div class="flex flex-col gap-1">
<div class="chat-tree-box chat-tree-box--pulse rounded-lg bg-[#1a1a1a] px-3 py-2 text-xs text-white text-center">ReplyRow</div>
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

<div class="relative w-full h-full p-2 box-border flex flex-col gap-2 min-h-0 overflow-hidden">
<h2 class="!text-white !mt-0 !mb-0 text-lg font-bold text-center shrink-0 leading-tight">
useObserveEffect — Side Effects без React Render
</h2>
<div class="grid grid-cols-2 gap-3 flex-1 min-h-0 items-start">
<div class="min-h-0">

```tsx {maxHeight:'200px'}
const isOpen$ = observable(false);

useObserveEffect(() => {
  if (isOpen$.get()) {
    dialogRef.current?.showModal();
  } else {
    dialogRef.current?.close();
  }
});
```

</div>
<div class="flex flex-col gap-1.5 min-h-0">
<h3 class="!text-white !mt-0 !mb-0 text-sm font-bold">Что происходит?</h3>
<ul class="!text-white text-xs space-y-1 list-disc pl-4 m-0">
<li><strong>Автоматически подписывается</strong> на <code>isOpen$</code>.</li>
<li><strong>Повторно выполняется</strong> только при изменении Observable.</li>
<li><strong>Не использует</strong> <code>dependency array</code>.</li>
<li><strong>Не вызывает</strong> ререндер компонента.</li>
<li><strong>Напрямую выполняет Side Effect</strong> (<code>showModal()</code> / <code>close()</code>).</li>
</ul>
</div>
</div>
<div class="shrink-0 rounded-lg bg-zinc-800/90 border border-zinc-700 px-3 py-2">
<h3 class="!text-white !mt-0 !mb-1.5 text-sm font-bold text-center">Главное отличие</h3>
<div class="grid grid-cols-[1fr_auto_1fr] gap-2 items-center text-xs text-white">
<div class="flex flex-wrap items-center justify-center gap-1">
<span class="rounded bg-zinc-700 px-2 py-0.5">React</span>
<span class="opacity-60">→</span>
<span class="rounded bg-zinc-700 px-2 py-0.5">State</span>
<span class="opacity-60">→</span>
<span class="rounded bg-zinc-700 px-2 py-0.5">Render</span>
<span class="opacity-60">→</span>
<span class="rounded bg-zinc-700 px-2 py-0.5">Effect</span>
</div>
<span class="text-zinc-500 font-bold text-center">vs</span>
<div class="flex flex-wrap items-center justify-center gap-1">
<span class="rounded bg-sky-900/60 px-2 py-0.5 border border-sky-700/50">Observable</span>
<span class="opacity-60">→</span>
<span class="rounded bg-sky-900/60 px-2 py-0.5 border border-sky-700/50">ObserveEffect</span>
</div>
</div>
<p class="!text-white !mt-1.5 !mb-0 text-xs text-center opacity-90">
<strong>Render полностью исключается из цепочки.</strong>
</p>
</div>
</div>

---
layout: full
---

<div class="relative w-full h-full p-2 box-border flex flex-col gap-2 min-h-0 overflow-hidden">

<h2 class="!text-white !mt-0 !mb-0 text-lg font-bold text-center shrink-0 leading-tight">
Context + Observable = Минимум ререндеров
</h2>

<div class="grid grid-cols-2 gap-3 flex-1 min-h-0 items-start">

<div class="min-h-0 overflow-hidden">

```tsx {maxHeight:'240px'}
function ReplyIdProvider({ children }) {
  const replyState$ = useObservable({
    replyId: '',
    chars: 0,
  });

  return (
    <ReplyIdContext.Provider value={replyState$}>
      {children}
    </ReplyIdContext.Provider>
  );
}

function useIsReplyMessage(messageId: string) {
  const replyState$ = useContext(ReplyIdContext);

  return useValue(
    () => replyState$.replyId.get() === messageId
  );
}
```

</div>

<div class="flex flex-col gap-1.5 min-h-0">

<h3 class="!text-white !mt-0 !mb-0 text-sm font-bold">Что происходит?</h3>

<ul class="!text-white text-xs space-y-1 list-disc pl-4 m-0">
<li><strong>Context передаёт стабильный Observable</strong>, не меняющийся объект state.</li>
<li><strong>Provider не ререндерится</strong> — ссылка на Observable неизменна.</li>
<li><strong><code>useContext()</code> только получает Observable</strong>, не подписывает компонент.</li>
<li><strong>Подписка через <code>useValue()</code></strong> — там, где данные используются.</li>
<li><strong>Derived Value</strong> (<code>replyId === messageId</code>) — обновляются только нужные компоненты.</li>
</ul>

</div>

</div>

<div class="shrink-0 rounded-lg bg-zinc-800/90 border border-zinc-700 px-3 py-2">

<h3 class="!text-white !mt-0 !mb-1.5 text-sm font-bold text-center">Главное отличие</h3>

<div class="grid grid-cols-[1fr_auto_1fr] gap-2 items-center text-xs text-white">

<div class="flex flex-wrap items-center justify-center gap-1">
<span class="rounded bg-zinc-700 px-2 py-0.5">Context</span>
<span class="opacity-60">→</span>
<span class="rounded bg-zinc-700 px-2 py-0.5">All Consumers</span>
<span class="opacity-60">→</span>
<span class="rounded bg-zinc-700 px-2 py-0.5">Render</span>
</div>

<span class="text-zinc-500 font-bold text-center">vs</span>

<div class="flex flex-wrap items-center justify-center gap-1">
<span class="rounded bg-sky-900/60 px-2 py-0.5 border border-sky-700/50">Context</span>
<span class="opacity-60">→</span>
<span class="rounded bg-sky-900/60 px-2 py-0.5 border border-sky-700/50">Observable</span>
<span class="opacity-60">→</span>
<span class="rounded bg-sky-900/60 px-2 py-0.5 border border-sky-700/50">useValue()</span>
<span class="opacity-60">→</span>
<span class="rounded bg-sky-900/60 px-2 py-0.5 border border-sky-700/50">Нужный Consumer</span>
</div>

</div>

<p class="!text-white !mt-1.5 !mb-0 text-xs text-center opacity-90">
<strong>Context становится транспортом данных, а не источником ререндеров.</strong>
</p>

</div>

</div>

---
layout: full
---

<style>
.chat-app-box {
  border-style: solid;
  border-width: 1px;
  border-color: rgb(255 255 255 / 0.12);
}

.chat-app-box--pulse {
  animation-duration: 10s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

/* Фазы цикла (как на скринах):
   ~10%  ReplyHighlight + ReplyPreview + TypingIndicator
   ~30%  все шесть leaf-компонентов
   ~50%  только ReplyPreview
   ~70%  OnlineDot + ReplyHighlight + SendButton
   ~90%  UnreadBadge + ReplyHighlight + ReplyPreview */

.chat-app-box--pulse-unread { animation-name: chat-app-pulse-unread; }
.chat-app-box--pulse-online { animation-name: chat-app-pulse-online; }
.chat-app-box--pulse-reply-highlight { animation-name: chat-app-pulse-reply-highlight; }
.chat-app-box--pulse-reply-preview { animation-name: chat-app-pulse-reply-preview; }
.chat-app-box--pulse-send { animation-name: chat-app-pulse-send; }
.chat-app-box--pulse-typing { animation-name: chat-app-pulse-typing; }

@keyframes chat-app-pulse-unread {
  0%, 6%, 14%, 16%, 86%, 94%, 100% { border-color: rgb(52 152 219 / 0); box-shadow: 0 0 0 0 rgb(52 152 219 / 0); }
  30%, 90% { border-color: rgb(52 152 219 / 1); box-shadow: 0 0 10px 0 rgb(52 152 219 / 0.35); }
}

@keyframes chat-app-pulse-online {
  0%, 6%, 14%, 16%, 46%, 54%, 56%, 86%, 94%, 100% { border-color: rgb(52 152 219 / 0); box-shadow: 0 0 0 0 rgb(52 152 219 / 0); }
  30%, 70% { border-color: rgb(52 152 219 / 1); box-shadow: 0 0 10px 0 rgb(52 152 219 / 0.35); }
}

@keyframes chat-app-pulse-reply-highlight {
  0%, 6%, 14%, 36%, 66%, 74%, 76%, 86%, 94%, 100% { border-color: rgb(52 152 219 / 0); box-shadow: 0 0 0 0 rgb(52 152 219 / 0); }
  10%, 30%, 70%, 90% { border-color: rgb(52 152 219 / 1); box-shadow: 0 0 10px 0 rgb(52 152 219 / 0.35); }
}

@keyframes chat-app-pulse-reply-preview {
  0%, 6%, 14%, 36%, 66%, 74%, 76%, 86%, 94%, 100% { border-color: rgb(52 152 219 / 0); box-shadow: 0 0 0 0 rgb(52 152 219 / 0); }
  10%, 30%, 50%, 90% { border-color: rgb(52 152 219 / 1); box-shadow: 0 0 10px 0 rgb(52 152 219 / 0.35); }
}

@keyframes chat-app-pulse-send {
  0%, 6%, 14%, 16%, 46%, 54%, 56%, 86%, 94%, 100% { border-color: rgb(52 152 219 / 0); box-shadow: 0 0 0 0 rgb(52 152 219 / 0); }
  30%, 70% { border-color: rgb(52 152 219 / 1); box-shadow: 0 0 10px 0 rgb(52 152 219 / 0.35); }
}

@keyframes chat-app-pulse-typing {
  0%, 6%, 14%, 16%, 46%, 54%, 100% { border-color: rgb(52 152 219 / 0); box-shadow: 0 0 0 0 rgb(52 152 219 / 0); }
  10%, 30% { border-color: rgb(52 152 219 / 1); box-shadow: 0 0 10px 0 rgb(52 152 219 / 0.35); }
}
</style>

<div class="relative w-full h-full p-2 box-border flex flex-col gap-1 min-h-0 overflow-hidden">

<h2 class="!text-white !mt-0 !mb-0 text-base font-bold text-center shrink-0 leading-tight">
Render once не означает никаких апдейтов
</h2>

<div class="flex-1 min-h-0 flex items-center justify-center overflow-hidden">

<div class="w-full max-w-[98%] origin-center scale-[0.92] sm:scale-100">

<div class="chat-app-box rounded-lg bg-[#1a1a1a] p-1.5 flex flex-col gap-1 min-h-0">
<div class="text-[10px] font-medium text-white text-center shrink-0">ChatApp</div>

<div class="chat-app-box rounded-lg bg-[#1a1a1a] p-1.5 flex flex-col gap-1 min-h-0">
<div class="text-[10px] font-medium text-white text-center shrink-0">ChatScreen</div>

<div class="grid grid-cols-[minmax(0,0.9fr)_minmax(0,2.2fr)_minmax(0,0.9fr)] gap-1.5 items-stretch min-h-0">

<div class="chat-app-box rounded-lg bg-[#1a1a1a] p-1 flex flex-col gap-1 min-h-0 min-w-0">
<div class="text-[9px] font-medium text-white text-center shrink-0">InboxSidebar</div>
<div class="chat-app-box rounded bg-[#1a1a1a] p-1 flex flex-col gap-0.5 min-w-0">
<div class="text-[9px] text-white text-center shrink-0">RoomList</div>
<div class="chat-app-box rounded bg-[#1a1a1a] p-1 flex flex-col gap-0.5 min-w-0">
<div class="text-[9px] text-white text-center shrink-0">RoomRow</div>
<div class="chat-app-box chat-app-box--pulse chat-app-box--pulse-unread rounded bg-[#1a1a1a] px-1 py-0.5 text-[8px] text-white text-center">UnreadBadge</div>
</div>
</div>
</div>

<div class="chat-app-box rounded-lg bg-[#1a1a1a] p-1 flex flex-col gap-1 min-h-0 min-w-0">
<div class="text-[9px] font-medium text-white text-center shrink-0">ConversationView</div>
<div class="grid grid-cols-3 gap-1 flex-1 min-h-0 min-w-0">

<div class="chat-app-box rounded bg-[#1a1a1a] p-1 flex flex-col gap-0.5 min-w-0">
<div class="text-[9px] text-white text-center shrink-0">RoomHeader</div>
<div class="chat-app-box rounded bg-[#1a1a1a] p-1 flex flex-col gap-0.5 min-w-0">
<div class="text-[9px] text-white text-center shrink-0">Presence</div>
<div class="chat-app-box chat-app-box--pulse chat-app-box--pulse-online rounded bg-[#1a1a1a] px-1 py-0.5 text-[8px] text-white text-center">OnlineDot</div>
</div>
</div>

<div class="chat-app-box rounded bg-[#1a1a1a] p-1 flex flex-col gap-0.5 min-w-0">
<div class="text-[9px] text-white text-center shrink-0">MessageList</div>
<div class="chat-app-box rounded bg-[#1a1a1a] p-0.5 flex flex-col gap-0.5 min-w-0">
<div class="text-[8px] text-white text-center shrink-0">DaySection</div>
<div class="chat-app-box rounded bg-[#1a1a1a] p-0.5 flex flex-col gap-0.5 min-w-0">
<div class="text-[8px] text-white text-center shrink-0">MessageCluster</div>
<div class="chat-app-box rounded bg-[#1a1a1a] p-0.5 flex flex-col gap-0.5 min-w-0">
<div class="text-[8px] text-white text-center shrink-0">MessageBubble</div>
<div class="chat-app-box chat-app-box--pulse chat-app-box--pulse-reply-highlight rounded bg-[#1a1a1a] px-0.5 py-0.5 text-[7px] text-white text-center leading-tight">ReplyHighlight</div>
</div>
</div>
</div>
</div>

<div class="chat-app-box rounded bg-[#1a1a1a] p-1 flex flex-col gap-0.5 min-w-0">
<div class="text-[9px] text-white text-center shrink-0">Composer</div>
<div class="chat-app-box chat-app-box--pulse chat-app-box--pulse-reply-preview rounded bg-[#1a1a1a] px-1 py-0.5 text-[8px] text-white text-center">ReplyPreview</div>
<div class="chat-app-box rounded bg-[#1a1a1a] p-1 flex flex-col gap-0.5 min-w-0">
<div class="text-[9px] text-white text-center shrink-0">InputRow</div>
<div class="chat-app-box chat-app-box--pulse chat-app-box--pulse-send rounded bg-[#1a1a1a] px-1 py-0.5 text-[8px] text-white text-center">SendButton</div>
</div>
</div>

</div>
</div>

<div class="chat-app-box rounded-lg bg-[#1a1a1a] p-1 flex flex-col gap-1 min-h-0 min-w-0">
<div class="text-[9px] font-medium text-white text-center shrink-0">MembersPanel</div>
<div class="chat-app-box rounded bg-[#1a1a1a] p-1 flex flex-col gap-0.5 min-w-0">
<div class="text-[9px] text-white text-center shrink-0">MemberList</div>
<div class="chat-app-box rounded bg-[#1a1a1a] p-1 flex flex-col gap-0.5 min-w-0">
<div class="text-[9px] text-white text-center shrink-0">TypingStatus</div>
<div class="chat-app-box chat-app-box--pulse chat-app-box--pulse-typing rounded bg-[#1a1a1a] px-1 py-0.5 text-[8px] text-white text-center leading-tight">TypingIndicator</div>
</div>
</div>
</div>

</div>
</div>
</div>

</div>
</div>

</div>

---
layout: full
---
<h2 class="!text-white !mt-0 !mb-0 text-base font-bold text-center shrink-0 leading-tight">
Legend State
</h2>

<div class="relative w-full h-full p-4 box-border flex items-center justify-center min-h-0 overflow-hidden">

<div class="grid grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-8 w-full max-w-5xl items-center">

<div class="flex flex-col gap-2 min-w-0">

<div class="grid grid-cols-[7.5rem_1fr] items-center gap-3 h-8">
<span class="text-right text-sm text-white/90 whitespace-nowrap">Legend State</span>
<div class="h-7 rounded-full bg-[rgb(52_152_219)] flex items-center justify-end px-3 min-w-0" style="width: 16%">
<span class="text-xs font-medium text-white">1.02</span>
</div>
</div>

<div class="grid grid-cols-[7.5rem_1fr] items-center gap-3 h-8">
<span class="text-right text-sm text-white/90 whitespace-nowrap">Jotai</span>
<div class="h-7 rounded-full bg-[#3d4f63] flex items-center justify-end px-3 min-w-0" style="width: 77.5%">
<span class="text-xs font-medium text-white/90">1.41</span>
</div>
</div>

<div class="grid grid-cols-[7.5rem_1fr] items-center gap-3 h-8">
<span class="text-right text-sm text-white/90 whitespace-nowrap">MobX</span>
<div class="h-7 rounded-full bg-[#3d4f63] flex items-center justify-end px-3 min-w-0" style="width: 81.9%">
<span class="text-xs font-medium text-white/90">1.49</span>
</div>
</div>

<div class="grid grid-cols-[7.5rem_1fr] items-center gap-3 h-8">
<span class="text-right text-sm text-white/90 whitespace-nowrap">Recoil</span>
<div class="h-7 rounded-full bg-[#3d4f63] flex items-center justify-end px-3 min-w-0" style="width: 84.1%">
<span class="text-xs font-medium text-white/90">1.53</span>
</div>
</div>

<div class="grid grid-cols-[7.5rem_1fr] items-center gap-3 h-8">
<span class="text-right text-sm text-white/90 whitespace-nowrap">Redux</span>
<div class="h-7 rounded-full bg-[#3d4f63] flex items-center justify-end px-3 min-w-0" style="width: 85.2%">
<span class="text-xs font-medium text-white/90">1.55</span>
</div>
</div>

<div class="grid grid-cols-[7.5rem_1fr] items-center gap-3 h-8">
<span class="text-right text-sm text-white/90 whitespace-nowrap">Zustand</span>
<div class="h-7 rounded-full bg-[#3d4f63] flex items-center justify-end px-3 min-w-0" style="width: 92.9%">
<span class="text-xs font-medium text-white/90">1.69</span>
</div>
</div>

<div class="grid grid-cols-[7.5rem_1fr] items-center gap-3 h-8">
<span class="text-right text-sm text-white/90 whitespace-nowrap">Valtio</span>
<div class="h-7 rounded-full bg-[#3d4f63] flex items-center justify-end px-3 min-w-0 w-full">
<span class="text-xs font-medium text-white/90">1.82</span>
</div>
</div>

</div>

<div class="flex flex-col gap-4 min-w-0 pr-2">

<h2 class="!text-white !mt-0 !mb-0 text-2xl font-bold leading-tight">
🚀 The fastest React state library
</h2>

<p class="!text-white !mb-0 text-sm leading-relaxed opacity-80">
Legend-State is so fast that it even outperforms vanilla JS in some benchmarks.
It's extremely optimized with fine-grained reactivity and massively reduces re-rendering.
</p>

</div>

</div>

</div>
