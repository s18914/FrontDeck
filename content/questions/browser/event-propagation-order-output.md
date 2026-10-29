---
title: In what order are these click listeners called when the button is clicked?
category: browser
level: mid
tags: [events, output-prediction]
sources: []
---

```html
<div id="outer">
  <button id="inner">Click</button>
</div>
```

```ts
const outer = document.querySelector('#outer')!
const inner = document.querySelector('#inner')!

outer.addEventListener('click', () => console.log('outer bubble'))
outer.addEventListener('click', () => console.log('outer capture'), { capture: true })
inner.addEventListener('click', () => console.log('inner bubble'))
inner.addEventListener('click', () => console.log('inner capture'), { capture: true })
document.addEventListener('click', () => console.log('document bubble'))
```

<!-- answer -->

```ts
outer capture
inner capture
inner bubble
outer bubble
document bubble
```

The event first travels **down** (capture phase), then **up** (bubble phase):

1. **Capture**: from `document` down, so `outer capture` runs before anything on the button.
2. **Target**: on the button itself, modern browsers run **capturing listeners first**, then the non-capturing ones. So `inner capture` comes before `inner bubble` even though the bubble listener was registered earlier. (Older browsers used plain registration order at the target, which is why some articles show the opposite.)
3. **Bubble**: back up, so `outer bubble` and finally `document bubble`.

The rule to remember: **capture goes top-down, bubble goes bottom-up**, and adding `{ capture: true }` on an ancestor lets it see the event before the target.
