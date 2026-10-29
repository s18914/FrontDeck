---
title: What are the pros and cons of snapshot testing for React components?
category: testing
level: mid
tags: [dom]
sources: []
---

A snapshot test **saves the serialized output** (e.g. rendered HTML) on the first run and **fails when it changes** later. It is very **cheap to write**, but it only tells you that something changed, **not whether the change is correct**.

Pros:

- One line catches **unexpected changes** in output.
- Works well for **small, stable, serializable output**: a formatter, a generated config, an error message.
- **Inline snapshots** (`toMatchInlineSnapshot()`) keep the expected value right in the test, which makes reviews easy.

Cons:

- Large component snapshots break on **every harmless markup change**, so people get used to running **`vitest -u`** without reading the diff.
- They **don't express intent** — a reader can't tell which part of 200 lines of HTML matters.
- They test **implementation details** (structure, class names) instead of behavior.

Rule of thumb: use snapshots **sparingly and keep them small**. For components, prefer explicit assertions like `getByRole(...)` and `toHaveTextContent(...)`, and use visual regression (screenshot) tests when you care about how things look.
