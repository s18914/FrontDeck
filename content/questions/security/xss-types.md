---
title: What is cross-site scripting (XSS), and what types of XSS are there?
category: security
level: junior
tags: [dom]
sources:
  - title: Cross-site scripting (XSS) – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/XSS
---

XSS happens when an attacker manages to **run their own JavaScript in your page**, in your users' browsers, with your site's privileges. That script can read what's on the page, call your APIs as the user, or steal tokens that JavaScript can access.

Three types:

- **Stored** — the payload is saved on the server (a comment, a profile name) and served to every visitor. Usually the most damaging.
- **Reflected** — the payload is in the request (e.g. a query parameter) and the server echoes it into the HTML. The victim must open a crafted link.
- **DOM-based** — happens entirely in client-side code: your JavaScript reads attacker-controlled data (`location.hash`, query params, `postMessage`) and writes it into a dangerous **sink** such as `innerHTML` or `eval`. The server may never see the payload.

Defenses: **output encoding**, **sanitizing** HTML you must render, and a **Content Security Policy**.
