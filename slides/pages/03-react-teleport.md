---
layout: full
---

<div class="flex flex-col items-center justify-center w-full h-full p-8 box-border text-center leading-snug max-w-2xl mx-auto">

<h1 class="!text-white !mt-0 !mb-0 text-3xl font-bold">react-teleport</h1>

</div>

<!--
Speaker note: placeholder — TBD. После WebGPU.
-->

---
layout: full
---

<style>
.rt-demo {
  --rt-cycle: 11s;
}

.rt-chat-overlay {
  transform: translateX(100%);
  animation: rt-chat-slide var(--rt-cycle) cubic-bezier(0.32, 0.72, 0, 1) infinite;
}

.rt-menu-on-screen {
  opacity: 0;
  animation: rt-menu-pop-teleport var(--rt-cycle) ease-in-out infinite;
}

.rt-menu-in-chat {
  opacity: 0;
  animation: rt-menu-pop-modal var(--rt-cycle) ease-in-out infinite;
}

.rt-menu-dot {
  animation: rt-menu-dot-pulse var(--rt-cycle) ease-in-out infinite;
}

@keyframes rt-chat-slide {
  0%, 11% {
    transform: translateX(100%);
    box-shadow: none;
  }
  19%, 44% {
    transform: translateX(0);
    box-shadow: none;
  }
  52%, 60% {
    transform: translateX(36%);
    box-shadow: -5px 0 14px rgb(0 0 0 / 0.12);
  }
  68%, 100% {
    transform: translateX(100%);
    box-shadow: none;
  }
}

@keyframes rt-menu-pop-teleport {
  0%, 36% {
    opacity: 0;
    transform: scale(0.94);
  }
  40%, 74% {
    opacity: 1;
    transform: scale(1);
  }
  80%, 100% {
    opacity: 0;
    transform: scale(1);
  }
}

@keyframes rt-menu-pop-modal {
  0%, 36% {
    opacity: 0;
    transform: scale(0.94);
  }
  40%, 58% {
    opacity: 1;
    transform: scale(1);
  }
  64%, 100% {
    opacity: 0;
    transform: scale(1);
  }
}

@keyframes rt-menu-dot-pulse {
  0%, 32% {
    transform: scale(1);
    background: transparent;
  }
  34%, 38% {
    transform: scale(1.12);
    background: rgb(0 0 0 / 0.07);
  }
  40%, 100% {
    transform: scale(1);
    background: transparent;
  }
}
</style>

<div class="flex flex-col items-center justify-center gap-2 w-full h-full p-3 box-border min-h-0 overflow-hidden">

<div class="grid grid-cols-2 gap-5 items-end justify-items-center max-w-3xl w-full">

<div class="rt-demo flex flex-col items-center gap-2 min-w-0">

<h2 class="!text-[#ef5350] !mt-0 !mb-0 text-sm font-semibold shrink-0 tracking-tight text-center leading-tight">✗ Render on top of screen</h2>

<div class="rt-phone-frame relative w-[min(19vw,155px)] shrink-0 aspect-[9/19.5] rounded-[1.6rem] border-[2px] border-[#6a6a6a] bg-[#2a2a2a] p-[5px] shadow-[0_12px_28px_rgba(0,0,0,0.35)]">

<div class="relative h-full w-full">

<div class="rt-phone-screen relative h-full w-full overflow-hidden rounded-[1.25rem] bg-[#f2f2f2]">

<div class="absolute left-1/2 top-[5px] z-40 h-[15px] w-[56px] -translate-x-1/2 rounded-full bg-black"></div>

<div class="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-3 pt-[21px] pb-0.5 text-[7px] font-semibold text-black pointer-events-none">
<span>09:41</span>
<div class="flex items-center gap-0.5">
<svg class="h-[6px] w-[8px]" viewBox="0 0 10 8" fill="currentColor"><rect x="0" y="5" width="2" height="3" rx="0.5"/><rect x="3" y="3" width="2" height="5" rx="0.5"/><rect x="6" y="1" width="2" height="7" rx="0.5"/><rect x="9" y="0" width="1" height="8" rx="0.5"/></svg>
<svg class="h-[6px] w-[8px]" viewBox="0 0 12 9" fill="currentColor"><path d="M6 1.5C4.2 1.5 2.6 2.2 1.4 3.3L0 1.9C1.6 0.7 3.7 0 6 0s4.4 0.7 6 1.9l-1.4 1.4C9.4 2.2 7.8 1.5 6 1.5zm0 3c-1 0-1.9.4-2.6 1l-1.4-1.4c1-0.9 2.3-1.4 4-1.4s3 0.5 4 1.4L9.6 5.5C8.9 4.9 8 4.5 6 4.5zm0 3c-0.6 0-1.1 0.2-1.5 0.6L6 9l1.5-0.9C7.1 7.7 6.6 7.5 6 7.5z"/></svg>
<div class="flex h-[6px] w-[14px] items-center rounded-[2px] border border-black/70 px-[1px]">
<div class="h-[4px] w-[9px] rounded-[1px] bg-[#34e86a]"></div>
</div>
</div>
</div>

<div class="absolute inset-0 z-0 flex flex-col pt-[36px] px-1.5 pb-1.5">

<div class="px-1 pb-1.5">
<span class="text-[11px] font-bold text-black">Chats</span>
</div>

<div class="flex flex-1 flex-col overflow-hidden rounded-xl bg-white shadow-[0_1px_4px_rgba(0,0,0,0.06)]">

<div class="flex items-start gap-1.5 border-b border-black/5 px-2 py-1.5">
<div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#5b9fd4] text-[7px] font-bold text-white">K</div>
<div class="min-w-0 flex-1">
<div class="flex items-baseline justify-between gap-1">
<span class="text-[7px] font-bold text-black">Kirill</span>
<span class="shrink-0 text-[6px] text-[#999]">09:41</span>
</div>
<div class="flex items-center justify-between gap-1">
<span class="truncate text-[6px] text-[#888]">Sure, let's go for a walk?</span>
<span class="flex h-3 min-w-3 shrink-0 items-center justify-center rounded-full bg-[#5b9fd4] px-0.5 text-[5px] font-bold text-white">2</span>
</div>
</div>
</div>

<div class="flex items-start gap-1.5 border-b border-black/5 px-2 py-1.5">
<div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#9b7fd4] text-[6px] font-bold text-white">DT</div>
<div class="min-w-0 flex-1">
<div class="flex items-baseline justify-between gap-1">
<span class="text-[7px] font-bold text-black">Design Team</span>
<span class="shrink-0 text-[6px] text-[#999]">08:16</span>
</div>
<span class="block truncate text-[6px] text-[#888]">Slides are ready for the conference dry r…</span>
</div>
</div>

<div class="flex items-start gap-1.5 border-b border-black/5 px-2 py-1.5">
<div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#d47fa8] text-[7px] font-bold text-white">A</div>
<div class="min-w-0 flex-1">
<div class="flex items-baseline justify-between gap-1">
<span class="text-[7px] font-bold text-black">Anna</span>
<span class="shrink-0 text-[6px] text-[#999]">Yesterday</span>
</div>
<span class="block truncate text-[6px] text-[#888]">Let's keep the sticker animation alive in t…</span>
</div>
</div>

<div class="flex items-start gap-1.5 border-b border-black/5 px-2 py-1.5">
<div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#6fbf8a] text-[6px] font-bold text-white">MC</div>
<div class="min-w-0 flex-1">
<div class="flex items-baseline justify-between gap-1">
<span class="text-[7px] font-bold text-black">Mobile Core</span>
<span class="shrink-0 text-[6px] text-[#999]">Yesterday</span>
</div>
<div class="flex items-center justify-between gap-1">
<span class="truncate text-[6px] text-[#888]">React Native 0.81 build is green on…</span>
<span class="flex h-3 min-w-3 shrink-0 items-center justify-center rounded-full bg-[#5b9fd4] px-0.5 text-[5px] font-bold text-white">5</span>
</div>
</div>
</div>

<div class="flex items-start gap-1.5 px-2 py-1.5">
<div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e8a04a] text-[7px] font-bold text-white">E</div>
<div class="min-w-0 flex-1">
<div class="flex items-baseline justify-between gap-1">
<span class="text-[7px] font-bold text-black">Events</span>
<span class="shrink-0 text-[6px] text-[#999]">Thu</span>
</div>
<span class="block truncate text-[6px] text-[#888]">Reminder: speaker check-in opens at 7:30.</span>
</div>
</div>

</div>
</div>

<div class="rt-chat-overlay absolute inset-0 z-10 flex flex-col bg-[#ececec] pt-[36px]">

<div class="relative flex items-center justify-between border-b border-black/5 bg-white px-2.5 py-2">
<div class="flex items-center gap-0.5 text-[8px] font-medium text-black">
<svg class="h-2.5 w-2.5" viewBox="0 0 8 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 1L2 6l4 5"/></svg>
<span>Back</span>
</div>
<span class="text-[9px] font-semibold text-black">Kirill</span>
<div class="rt-menu-dot flex h-4 w-4 items-center justify-center rounded-full">
<svg class="h-3 w-3" viewBox="0 0 4 16" fill="currentColor"><circle cx="2" cy="2" r="1.5"/><circle cx="2" cy="8" r="1.5"/><circle cx="2" cy="14" r="1.5"/></svg>
</div>
</div>

<div class="flex flex-col gap-1.5 px-2.5 py-2.5">

<div class="max-w-[80%] self-start rounded-2xl rounded-bl-md bg-white px-2.5 py-1.5 text-[7px] leading-snug text-[#333] shadow-sm">Hello, not too bad! You?</div>

<div class="max-w-[80%] self-end rounded-2xl rounded-br-md bg-[#d8f5de] px-2.5 py-1.5 text-[7px] leading-snug text-[#1a1a1a] shadow-sm">What is your plan for evening today?</div>

<div class="max-w-[80%] self-start rounded-2xl rounded-bl-md bg-white px-2.5 py-1.5 text-[7px] leading-snug text-[#333] shadow-sm">I'm not sure yet... Any ideas?</div>

<div class="max-w-[80%] self-end rounded-2xl rounded-br-md bg-[#d8f5de] px-2.5 py-1.5 text-[7px] leading-snug text-[#1a1a1a] shadow-sm">Sure, let's go for a walk?</div>

</div>

<div class="rt-menu-in-chat absolute right-1.5 top-[54px] z-20 w-[94px] overflow-hidden rounded-lg bg-white shadow-[0_8px_20px_rgba(0,0,0,0.16)]">

<div class="flex items-center justify-between border-b border-black/5 px-2 py-1.5 text-[6px] text-black">
<span>View details</span>
<svg class="h-2.5 w-2.5 shrink-0 opacity-70" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M3 1h6v10H3z"/><path d="M5 3h2"/></svg>
</div>

<div class="flex items-center justify-between border-b border-black/5 px-2 py-1.5 text-[6px] text-black">
<span>Mute chat</span>
<svg class="h-2.5 w-2.5 shrink-0 opacity-70" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M8 2l2 2-6 6-2-2z"/><path d="M2 8l2 2"/></svg>
</div>

<div class="flex items-center justify-between px-2 py-1.5 text-[6px] font-medium text-[#e53935]">
<span>Delete chat</span>
<svg class="h-2.5 w-2.5 shrink-0" viewBox="0 0 12 12" fill="none" stroke="#e53935" stroke-width="1.2"><path d="M2 3h8M4 3V2h4v1M3 3l.5 7h5L9 3"/></svg>
</div>

</div>

</div>

</div>
</div>

</div>

</div>

<div class="rt-demo flex flex-col items-center gap-2 min-w-0">

<h2 class="!text-[#34e86a] !mt-0 !mb-0 text-sm font-semibold shrink-0 tracking-tight text-center leading-tight">✓ Render in Modal</h2>

<div class="rt-phone-frame relative w-[min(19vw,155px)] shrink-0 aspect-[9/19.5] rounded-[1.6rem] border-[2px] border-[#6a6a6a] bg-[#2a2a2a] p-[5px] shadow-[0_12px_28px_rgba(0,0,0,0.35)]">

<div class="relative h-full w-full">

<div class="rt-phone-screen relative h-full w-full overflow-hidden rounded-[1.25rem] bg-[#f2f2f2]">

<div class="absolute left-1/2 top-[5px] z-40 h-[14px] w-[50px] -translate-x-1/2 rounded-full bg-black"></div>

<div class="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-3 pt-[20px] pb-0.5 text-[7px] font-semibold text-black pointer-events-none">
<span>09:41</span>
<div class="flex items-center gap-0.5">
<svg class="h-[6px] w-[8px]" viewBox="0 0 10 8" fill="currentColor"><rect x="0" y="5" width="2" height="3" rx="0.5"/><rect x="3" y="3" width="2" height="5" rx="0.5"/><rect x="6" y="1" width="2" height="7" rx="0.5"/><rect x="9" y="0" width="1" height="8" rx="0.5"/></svg>
<svg class="h-[6px] w-[8px]" viewBox="0 0 12 9" fill="currentColor"><path d="M6 1.5C4.2 1.5 2.6 2.2 1.4 3.3L0 1.9C1.6 0.7 3.7 0 6 0s4.4 0.7 6 1.9l-1.4 1.4C9.4 2.2 7.8 1.5 6 1.5zm0 3c-1 0-1.9.4-2.6 1l-1.4-1.4c1-0.9 2.3-1.4 4-1.4s3 0.5 4 1.4L9.6 5.5C8.9 4.9 8 4.5 6 4.5zm0 3c-0.6 0-1.1 0.2-1.5 0.6L6 9l1.5-0.9C7.1 7.7 6.6 7.5 6 7.5z"/></svg>
<div class="flex h-[6px] w-[14px] items-center rounded-[2px] border border-black/70 px-[1px]">
<div class="h-[4px] w-[9px] rounded-[1px] bg-[#34e86a]"></div>
</div>
</div>
</div>

<div class="absolute inset-0 z-0 flex flex-col pt-[34px] px-1.5 pb-1.5">

<div class="px-1 pb-1.5">
<span class="text-[10px] font-bold text-black">Chats</span>
</div>

<div class="flex flex-1 flex-col overflow-hidden rounded-xl bg-white shadow-[0_1px_4px_rgba(0,0,0,0.06)]">

<div class="flex items-start gap-1.5 border-b border-black/5 px-2 py-1.5">
<div class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#5b9fd4] text-[6px] font-bold text-white">K</div>
<div class="min-w-0 flex-1">
<div class="flex items-baseline justify-between gap-1">
<span class="text-[6px] font-bold text-black">Kirill</span>
<span class="shrink-0 text-[5px] text-[#999]">09:41</span>
</div>
<div class="flex items-center justify-between gap-1">
<span class="truncate text-[5px] text-[#888]">Sure, let's go for a walk?</span>
<span class="flex h-2.5 min-w-2.5 shrink-0 items-center justify-center rounded-full bg-[#5b9fd4] px-0.5 text-[4px] font-bold text-white">2</span>
</div>
</div>
</div>

<div class="flex items-start gap-1.5 border-b border-black/5 px-2 py-1.5">
<div class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#9b7fd4] text-[5px] font-bold text-white">DT</div>
<div class="min-w-0 flex-1">
<div class="flex items-baseline justify-between gap-1">
<span class="text-[6px] font-bold text-black">Design Team</span>
<span class="shrink-0 text-[5px] text-[#999]">08:16</span>
</div>
<span class="block truncate text-[5px] text-[#888]">Slides are ready for the conference dry r…</span>
</div>
</div>

<div class="flex items-start gap-1.5 border-b border-black/5 px-2 py-1.5">
<div class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#d47fa8] text-[6px] font-bold text-white">A</div>
<div class="min-w-0 flex-1">
<div class="flex items-baseline justify-between gap-1">
<span class="text-[6px] font-bold text-black">Anna</span>
<span class="shrink-0 text-[5px] text-[#999]">Yesterday</span>
</div>
<span class="block truncate text-[5px] text-[#888]">Let's keep the sticker animation alive in t…</span>
</div>
</div>

<div class="flex items-start gap-1.5 border-b border-black/5 px-2 py-1.5">
<div class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#6fbf8a] text-[5px] font-bold text-white">MC</div>
<div class="min-w-0 flex-1">
<div class="flex items-baseline justify-between gap-1">
<span class="text-[6px] font-bold text-black">Mobile Core</span>
<span class="shrink-0 text-[5px] text-[#999]">Yesterday</span>
</div>
<div class="flex items-center justify-between gap-1">
<span class="truncate text-[5px] text-[#888]">React Native 0.81 build is green on…</span>
<span class="flex h-2.5 min-w-2.5 shrink-0 items-center justify-center rounded-full bg-[#5b9fd4] px-0.5 text-[4px] font-bold text-white">5</span>
</div>
</div>
</div>

<div class="flex items-start gap-1.5 px-2 py-1.5">
<div class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e8a04a] text-[6px] font-bold text-white">E</div>
<div class="min-w-0 flex-1">
<div class="flex items-baseline justify-between gap-1">
<span class="text-[6px] font-bold text-black">Events</span>
<span class="shrink-0 text-[5px] text-[#999]">Thu</span>
</div>
<span class="block truncate text-[5px] text-[#888]">Reminder: speaker check-in opens at 7:30.</span>
</div>
</div>

</div>
</div>

<div class="rt-chat-overlay absolute inset-0 z-10 flex flex-col bg-[#ececec] pt-[34px]">

<div class="relative flex items-center justify-between border-b border-black/5 bg-white px-2 py-1.5">
<div class="flex items-center gap-0.5 text-[7px] font-medium text-black">
<svg class="h-2.5 w-2.5" viewBox="0 0 8 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 1L2 6l4 5"/></svg>
<span>Back</span>
</div>
<span class="text-[8px] font-semibold text-black">Kirill</span>
<div class="rt-menu-dot flex h-4 w-4 items-center justify-center rounded-full">
<svg class="h-3 w-3" viewBox="0 0 4 16" fill="currentColor"><circle cx="2" cy="2" r="1.5"/><circle cx="2" cy="8" r="1.5"/><circle cx="2" cy="14" r="1.5"/></svg>
</div>
</div>

<div class="flex flex-col gap-1.5 px-2 py-2">

<div class="max-w-[80%] self-start rounded-2xl rounded-bl-md bg-white px-2 py-1 text-[6px] leading-snug text-[#333] shadow-sm">Hello, not too bad! You?</div>

<div class="max-w-[80%] self-end rounded-2xl rounded-br-md bg-[#d8f5de] px-2 py-1 text-[6px] leading-snug text-[#1a1a1a] shadow-sm">What is your plan for evening today?</div>

<div class="max-w-[80%] self-start rounded-2xl rounded-bl-md bg-white px-2 py-1 text-[6px] leading-snug text-[#333] shadow-sm">I'm not sure yet... Any ideas?</div>

<div class="max-w-[80%] self-end rounded-2xl rounded-br-md bg-[#d8f5de] px-2 py-1 text-[6px] leading-snug text-[#1a1a1a] shadow-sm">Sure, let's go for a walk?</div>

</div>

</div>

</div>

<div class="rt-menu-on-screen absolute right-1.5 top-[22%] z-[60] w-[94px] overflow-hidden rounded-lg bg-white shadow-[0_8px_20px_rgba(0,0,0,0.18)]">

<div class="flex items-center justify-between border-b border-black/5 px-2 py-1.5 text-[6px] text-black">
<span>View details</span>
<svg class="h-2.5 w-2.5 shrink-0 opacity-70" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M3 1h6v10H3z"/><path d="M5 3h2"/></svg>
</div>

<div class="flex items-center justify-between border-b border-black/5 px-2 py-1.5 text-[6px] text-black">
<span>Mute chat</span>
<svg class="h-2.5 w-2.5 shrink-0 opacity-70" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M8 2l2 2-6 6-2-2z"/><path d="M2 8l2 2"/></svg>
</div>

<div class="flex items-center justify-between px-2 py-1.5 text-[6px] font-medium text-[#e53935]">
<span>Delete chat</span>
<svg class="h-2.5 w-2.5 shrink-0" viewBox="0 0 12 12" fill="none" stroke="#e53935" stroke-width="1.2"><path d="M2 3h8M4 3V2h4v1M3 3l.5 7h5L9 3"/></svg>
</div>

</div>

</div>
</div>

</div>

</div>

</div>
