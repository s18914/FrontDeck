---
title: Why is a div with an onClick handler not a good replacement for a button?
category: accessibility
level: junior
tags: [semantic-html, events]
sources: []
---

A `<div onClick>` works only for **mouse and touch users**. A native `<button>` gives you for free everything the div lacks:

- **Focusable** — it's in the Tab order; a div is not.
- **Keyboard activation** — Enter and Space fire `click`; a div ignores keys.
- **Role and name** — a screen reader announces "Save, button"; a div is read as plain text.
- **Disabled state and form behavior** — `disabled`, and `type="submit"` submits its form.

```tsx
// Bad: invisible to keyboard and screen reader users
<div onClick={save}>Save</div>

// Good
<button type="button" onClick={save}>Save</button>
```

Faking it means adding `role="button"`, `tabIndex={0}`, Enter and Space key handlers and disabled handling — more code that is easy to get wrong.

Rule of thumb: if it **performs an action**, use `<button>`; if it **navigates**, use a link (`<a href>` or Next.js `<Link>`). If the default look is the problem, style the native element instead of replacing it.
