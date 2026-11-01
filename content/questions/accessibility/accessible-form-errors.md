---
title: How do you make form fields and validation errors accessible?
category: accessibility
level: mid
tags: [forms, aria]
sources:
  - title: Forms Tutorial – W3C WAI
    url: https://www.w3.org/WAI/tutorials/forms/
---

Every field needs a **programmatic label**, and every error must be **linked to its field** with `aria-describedby`, **flagged** with `aria-invalid`, and **perceivable without color** — not just a red border.

```tsx
<label htmlFor="email">Email</label>
<input
  id="email"
  type="email"
  aria-invalid={error ? true : undefined}
  aria-describedby={error ? 'email-error' : undefined}
/>
{error && <p id="email-error">{error}</p>}
```

Key points:

- Use `<label htmlFor>` or wrap the input in a label. A **placeholder is not a label** — it disappears on typing and usually has poor contrast.
- Mark required fields visibly and with the `required` attribute.
- Error text should say **how to fix the problem** ("Enter a date like 2026-10-29"), not just "Invalid".
- On a failed submit, **move focus** to the first invalid field or to an error summary that links to each field.
- For errors that appear while typing, a live region can announce them — but don't announce on every keystroke.
- Group related radios or checkboxes with `<fieldset>` and `<legend>`.
- Generate ids with `useId` so a reused form component never produces duplicate ids.
