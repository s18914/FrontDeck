---
title: What is the virtual DOM?
category: react
level: junior
tags: [rendering]
sources: []
---

The virtual DOM is the **tree of plain JavaScript objects (React elements)** that your components return. On each update React builds a new tree, **compares it with the previous one** and applies **only the differences** to the real DOM.

The flow:

1. State changes, so React calls the affected components again.
2. They return a new element tree describing the UI.
3. React **diffs** the new tree against the old one (reconciliation).
4. It makes the **minimal DOM changes**, for example updating one text node.

Common misconception: the virtual DOM is not "faster than the DOM". Its real benefit is that you can write **declarative code that re-describes the whole UI**, while React keeps the expensive DOM operations small. Rendering a component does not always mean touching the DOM; if nothing changed, the DOM stays as is.
