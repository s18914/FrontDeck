---
title: What is an IDOR vulnerability, and how do you prevent broken access control in a web app?
category: security
level: senior
tags: [auth, http, server-actions]
sources:
  - title: Insecure Direct Object Reference Prevention Cheat Sheet – OWASP
    url: https://cheatsheetseries.owasp.org/cheatsheets/Insecure_Direct_Object_Reference_Prevention_Cheat_Sheet.html
---

An **IDOR (Insecure Direct Object Reference)** happens when the server uses an identifier from the request — `/api/invoices/42`, `deletePost(postId)` — **without checking that the current user may access that object**. Changing the id in the URL or request body then exposes or modifies someone else's data. It is the most common form of **broken access control**, which tops the OWASP Top 10.

Why it is so common: authentication is in place, so the endpoint "looks protected". But **being logged in is not the same as owning the resource**.

How to prevent it:

- **Check ownership or permission on every read and write**, on the server: `where: { id: postId, authorId: session.userId }` instead of `where: { id: postId }`.
- **Never trust identity or role data from the client** — take `userId`, `role` or `tenantId` from the session, not from the request body.
- **Centralize checks in a data access layer**, so every endpoint, Server Action and Route Handler goes through the same authorization logic instead of re-implementing it.
- **Deny by default** — new endpoints should require an explicit permission rule.
- **Return 404 rather than 403** for objects the user may not see, so you do not confirm that they exist.
- Unguessable ids (UUIDs) make enumeration harder but are **not a fix** — they are leaked in URLs, logs and shared links.

Test it explicitly: log in as user A and replay user B's requests with A's session. Automated tests for "user cannot access another user's resource" catch regressions that code review misses.
