---
title: How do you center an element horizontally and vertically in modern CSS?
category: html-css
level: junior
tags: [css-layout]
sources: []
---

The simplest modern way is to make the parent a **grid** and use **`place-items: center`**, or a **flex** container with `justify-content` and `align-items` set to `center`.

```css
.parent {
  display: grid;
  place-items: center;
}

.parent-flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

Other cases:

- **Horizontal only, block element with a width** — `margin-inline: auto`.
- **Text or inline content** — `text-align: center`.
- **Over other content** (a modal or a badge) — absolute positioning:

```css
.overlay {
  position: absolute;
  inset: 0;
  margin: auto;
  width: fit-content;
  height: fit-content;
}
```

The older `top: 50%; left: 50%; transform: translate(-50%, -50%)` trick still works but is rarely needed now.

Remember that vertical centering needs **height to center within**: if the parent is only as tall as its content, there's nothing to center in. Give it a `min-height` (for example `100dvh` for a full screen).
