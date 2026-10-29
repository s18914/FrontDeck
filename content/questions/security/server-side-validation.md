---
title: Why do you need to validate input on the server if the form already validates it in the browser?
category: security
level: junior
tags: [forms]
sources:
  - title: Input Validation – OWASP Cheat Sheet Series
    url: https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html
---

Client-side validation exists for **user experience** — instant feedback without a round trip. It gives **no security**, because the attacker controls the client: they can disable JavaScript, edit the DOM in DevTools, or skip the UI and send requests directly. The server must validate every input as if the form didn't exist.

Key points:

- Check **type, format, length, range and allowed values** on the server, and reject fields you don't expect.
- Hidden inputs, `disabled` fields and `maxLength` are just as editable as anything else.
- Also check **authorization**: "may this user edit item 42?" is something only the server can decide.
- Avoid duplicating rules by sharing a schema — the same Zod schema can run in the form and again in the Server Action or API route.
- Validation doesn't replace other defenses: still use parameterized queries and output encoding against injection.
