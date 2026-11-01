---
title: What color contrast does WCAG require?
category: accessibility
level: junior
tags: [styling]
sources:
  - title: Understanding Success Criterion 1.4.3 Contrast (Minimum) – W3C WAI
    url: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
---

At level AA, text needs a contrast ratio of at least **4.5:1**, and **large text** (about 24px regular or 18.66px bold and up) needs **3:1**. Level AAA raises this to 7:1 and 4.5:1.

Details worth knowing:

- The ratio goes from 1:1 (same color) to 21:1 (black on white) and is computed from the **relative luminance** of the two colors.
- **Non-text contrast** — borders of inputs, focus indicators and meaningful icons need **3:1** against neighboring colors.
- Disabled controls, pure decoration and logos are exempt.
- **Don't rely on color alone** — an error shown only by a red border fails for color-blind users; add text or an icon.
- Text over images or gradients must pass at its worst spot.
- Check **every theme** (light and dark) and hover or focus states.

Tools: the DevTools color picker shows the ratio; Lighthouse and axe flag failures.
