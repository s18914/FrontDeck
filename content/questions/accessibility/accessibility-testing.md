---
title: How would you test a web application for accessibility?
category: accessibility
level: mid
tags: [aria, semantic-html]
sources: []
---

Combine **automated tools** with **manual testing**. Automated checkers catch only a part of WCAG issues (often quoted as roughly a third), so keyboard and screen reader testing are essential.

- **Automated** — axe DevTools or **Lighthouse** in the browser; **axe-core** in tests (for example `@axe-core/playwright`, or an axe matcher in Vitest) so CI fails on regressions; `eslint-plugin-jsx-a11y` for static checks. They find missing alt text and labels, low contrast and invalid ARIA.
- **Keyboard only** — put the mouse away. Can you reach and operate everything with Tab, Shift+Tab, Enter, Space, Escape and arrows? Is focus always visible? Is the order logical? Any focus traps?
- **Screen reader** — NVDA on Windows, VoiceOver on macOS and iOS, TalkBack on Android. Check names, roles, states and announcements of dynamic content.
- **Zoom and reflow** — 200% zoom and a 320px-wide viewport without losing content.
- **Testing Library** — querying by role, e.g. `getByRole('button', { name: 'Save' })`, doubles as a basic check: if a test can't find it by role and name, assistive technology can't either.

A Lighthouse score of 100 doesn't mean the app is accessible — it only means no automated rule failed.
