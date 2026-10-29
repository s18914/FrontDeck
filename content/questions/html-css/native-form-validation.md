---
title: How does native HTML form validation work?
category: html-css
level: junior
tags: [forms, semantic-html]
sources:
  - title: Client-side form validation – MDN
    url: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation
---

You add **validation attributes** to form fields, and the browser checks them **on submit**. If a field is invalid, the form isn't submitted, the first invalid field gets focus and the browser shows its own error message.

```html
<form>
  <input type="email" name="email" required />
  <input name="zip" pattern="\d{2}-\d{3}" title="Format: 00-000" />
  <input type="number" name="age" min="18" max="120" />
  <textarea name="bio" maxlength="300"></textarea>
  <button>Send</button>
</form>
```

Main attributes: **`required`**, **`type`** (`email`, `url`, `number`), **`min`/`max`**, **`minlength`/`maxlength`**, **`pattern`** and **`step`**.

Useful extras:

- CSS can style states with **`:invalid`** and **`:user-invalid`** (the latter only after the user interacts, so empty fields aren't red on page load).
- JavaScript can use the **Constraint Validation API**: `input.validity`, `checkValidity()` and `setCustomValidity('message')` for custom rules.
- `novalidate` on the form turns off the browser UI when you show your own errors.

Client-side validation is only for **user experience**. Anyone can bypass it, so always **validate again on the server**, for example in a Server Action.
