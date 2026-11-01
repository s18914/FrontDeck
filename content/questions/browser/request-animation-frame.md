---
title: What is requestAnimationFrame and why is it better than setTimeout for animations?
category: browser
level: mid
tags: [rendering]
sources: []
---

`requestAnimationFrame(callback)` asks the browser to run your callback **right before the next repaint**. It is synced with the **display refresh rate**, so each visual update lands in exactly one frame.

Why it beats `setTimeout(fn, 16)`:

- **No drift or dropped frames** — timers aren't aligned with frames, so updates can arrive mid-frame or twice per frame, which causes jank.
- **Works on any refresh rate** — 60 Hz, 120 Hz or 144 Hz screens all get one call per frame.
- **Paused in background tabs**, which saves CPU and battery.
- Your DOM writes happen **before style and layout** for that frame, so they're batched naturally.

```ts
function step(time: number) {
  const progress = Math.min((time - start) / 500, 1)
  box.style.transform = `translateX(${progress * 300}px)`
  if (progress < 1) requestAnimationFrame(step)
}
const start = performance.now()
requestAnimationFrame(step)
```

Base the animation on the **timestamp argument**, not on a fixed step per call, so speed doesn't depend on frame rate. Each call schedules **one** frame, so loop by calling it again, and stop with `cancelAnimationFrame(id)`. For simple transitions, CSS is still easier and often faster.
