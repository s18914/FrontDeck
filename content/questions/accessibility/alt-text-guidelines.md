---
title: How do you write good alt text, and when should alt be empty?
category: accessibility
level: junior
tags: [semantic-html]
sources:
  - title: An alt Decision Tree – W3C WAI
    url: https://www.w3.org/WAI/tutorials/images/decision-tree/
---

Alt text should convey the **purpose or information of the image in its context**, not describe every pixel. Use an **empty `alt=""`** when the image is purely decorative or its content is already in nearby text, so screen readers skip it.

Rules of thumb:

- **Informative image** — say what matters: `alt="Sales doubled between 2024 and 2025"` for a chart.
- **Functional image** (the only content of a link or button) — describe the action: `alt="Search"`, not "magnifying glass".
- **Decorative image** — `alt=""`. Never omit the attribute: without it, many screen readers read the file name instead.
- **Duplicate of nearby text** (an avatar next to the user's name) — `alt=""`.
- Don't start with "Image of…" — the screen reader already announces it's an image.
- Complex images need a short alt plus a longer description nearby.

In Next.js, `next/image` requires the `alt` prop, which forces the decision.
