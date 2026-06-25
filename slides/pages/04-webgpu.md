# WebGPU в React Native

Сегмент 4

---

## Зачем GPU в бизнес-приложениях

Не игры — продуктовый UI, который должен оставаться плавным:

- Матовые панели и **performant blur**
- Богатые микровзаимодействия под списками, модалками, табами
- Scroll-linked эффекты, анимированные графики
- То, что раньше дёргалось на **JS / UI thread**

---

## WebGPU на React Native

Фундамент — **react-native-wgpu** (WebGPU / Dawn на iOS и Android):

- **Native build** — нативный модуль, `expo prebuild`
- **New Architecture** — RN ≥ 0.81
- Низкоуровневый WebGPU API + слои DX сверху

---

## Экосистема на WebGPU

Разные слои на одном стеке:

- **Skia Graphite** (`@next`) — Skia на WebGPU
- **Redraw** — векторный UI на TypeGPU (preview)
- В демо — только контекст; live = TypeGPU case study

---

## TypeGPU

Case study для демо — шейдеры на TypeScript:

- `'use gpu'` → WGSL через `unplugin-typegpu`
- `@typegpu/react` — хуки поверх canvas
- Live demo: видео → `texture_external` → shader grade

---

## Демо-приложение

**Тяжёлый сегмент** — переключаемся на Expo demo:

- TypeGPU video shader — zero-copy `importExternalTexture`, grade + vignette
- Wave chart — `'use gpu'` шейдер, живой график
- Кнопка Shader on/off на video-экране
- Fallback, если GPU-путь не сработает на устройстве

Передаём слово → **expo-observe** (партнёр)
