---
title: What is the difference between aria-label, aria-labelledby and aria-describedby?
category: accessibility
level: mid
tags: [aria]
sources:
  - title: Providing Accessible Names and Descriptions – ARIA APG
    url: https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/
---

**`aria-label`** sets an element's **accessible name** from a string, **`aria-labelledby`** builds the name from **other elements on the page** (by id), and **`aria-describedby`** adds a **description** that screen readers read after the name and role.

- `aria-label` — when there's no visible text, e.g. an icon-only button: `<button aria-label="Close">×</button>`.
- `aria-labelledby` — when the label is already visible: a dialog named by its heading, a region named by its `<h2>`. It can reference several ids.
- `aria-describedby` — extra info: hints, password rules, error messages.

Name precedence: **`aria-labelledby` > `aria-label` > native labeling** (`<label>`, `alt`, text content).

```tsx
<input id="pw" type="password" aria-describedby="pw-hint" />
<p id="pw-hint">At least 12 characters.</p>
```

Pitfalls:

- Prefer **visible labels**. `aria-label` is invisible to sighted users and often skipped by page translation tools.
- Naming a plain `div` or `span` without a role isn't reliably announced — names are for interactive elements, landmarks and similar roles.
- Don't put the role in the name ("Close button") — the screen reader adds "button" itself.
- The accessible name should **contain the visible label text**, so voice-control users can say what they see.
