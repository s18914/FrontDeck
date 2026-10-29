---
title: What are Core Web Vitals?
category: performance
level: junior
tags: [web-vitals]
sources:
  - title: Web Vitals – web.dev
    url: https://web.dev/articles/vitals
---

Core Web Vitals are three metrics from Google that measure **real user experience**: loading, responsiveness and visual stability.

- **LCP (Largest Contentful Paint)** — when the main content appears. Good: **≤ 2.5 s**.
- **INP (Interaction to Next Paint)** — how fast the page responds to clicks, taps and key presses. Good: **≤ 200 ms**.
- **CLS (Cumulative Layout Shift)** — how much the layout unexpectedly jumps. Good: **≤ 0.1**.

Key facts:

- A page passes when the **75th percentile** of real page visits is in the "good" range, measured separately for mobile and desktop.
- **INP replaced FID** (First Input Delay) as a Core Web Vital in March 2024.
- They are a signal in **Google Search ranking**, but more importantly they correlate with bounce rate and conversions.
- Other metrics like **TTFB** and **FCP** are useful for diagnosing problems, but they are not Core Web Vitals.
