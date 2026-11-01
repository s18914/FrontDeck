---
title: What is the difference between a 401 and a 403 status code?
category: networking
level: junior
tags: [http, auth]
sources: []
---

**401 Unauthorized** means the server **doesn't know who you are** — credentials are missing, invalid or expired. **403 Forbidden** means the server **knows who you are, but you aren't allowed** to do this.

Despite its name, 401 is really about **authentication**, while 403 is about **authorization**.

How the frontend usually reacts:

- **401** — try to refresh the token once, and if that fails, redirect to the login page.
- **403** — logging in again won't help. Show an "access denied" message or hide the action entirely.

A common detail: some APIs return **404 instead of 403** for private resources, so they don't reveal that the resource exists at all.
