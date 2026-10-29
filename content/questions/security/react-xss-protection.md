---
title: How does React protect you from XSS, and where can you still introduce it?
category: security
level: mid
tags: [rendering, dom]
sources:
  - title: Common components (e.g. div) – React docs
    url: https://react.dev/reference/react-dom/components/common
---

React **escapes every value rendered as text**: `{comment}` becomes a text node, so `<script>` or `<img onerror>` inside the string is displayed literally, never parsed as HTML. That closes the most common XSS hole — but only where React controls the output.

Where XSS still gets in:

- **`dangerouslySetInnerHTML`** — inserts raw HTML. Use it only with trusted or **sanitized** content.
- **URLs in `href`, `src` or `formAction`** — `<a href={user.website}>` with `javascript:alert(1)` runs code on click. React 19 replaces `javascript:` URLs with one that throws, but older versions only warned, so validate URLs anyway and **allow only `http:` and `https:`**.
- **Direct DOM writes** — `ref.current.innerHTML`, `insertAdjacentHTML`, third-party widgets that use them.
- **Spreading untrusted objects as props** — `<div {...dataFromApi} />` can smuggle in `dangerouslySetInnerHTML` or an `href`.
- **Code-evaluating APIs** — `eval`, `new Function`, `setTimeout` with a string.
- **Data embedded in a `<script>` tag** during SSR without escaping `</script>`.

```tsx
function safeHref(url: string) {
  const { protocol } = new URL(url, window.location.origin)
  return protocol === 'http:' || protocol === 'https:' ? url : undefined
}
```
