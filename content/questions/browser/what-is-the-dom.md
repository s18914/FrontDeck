---
title: What is the DOM?
category: browser
level: junior
tags: [dom]
sources:
  - title: Document Object Model (DOM) – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model
---

The DOM (Document Object Model) is the **in-memory tree of objects** the browser builds from the HTML. Every element, text node and comment becomes a **node**, and JavaScript reads and changes the page through this tree.

Key points:

- The DOM is **not the HTML source**. The browser fixes invalid markup while parsing, and scripts can change the tree later, so DevTools shows the current DOM, not the file you sent.
- It is a **language-neutral API**: `document.querySelector`, `element.append`, `classList.add`, `addEventListener` are all DOM methods.
- Changing the DOM can make the browser **recalculate styles, layout and paint**, which is why many writes in a row can be slow.

```ts
const item = document.createElement('li')
item.textContent = 'New task'
document.querySelector('ul')?.append(item)
```

In React you rarely touch the DOM directly: React keeps it in sync with your components, and you use **refs** only for things like focus or measuring.
