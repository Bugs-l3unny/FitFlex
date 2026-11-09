---
name: css-scroll-animations
description: Build scroll-driven animations with native CSS (animation-timeline, scroll(), view(), animation-range, named timelines). Trigger: scroll animations, reveal on scroll, parallax, reading progress bar, scroll-linked effects, "animaciones por scroll".
---

# CSS Scroll-Driven Animations

Prefer native CSS scroll-driven animations over JS scroll listeners or IntersectionObserver-driven class toggling. They run off the main thread, need no JS, and stay in sync with scroll position.

## Support (verified Nov 2026, caniuse)

- Chrome/Edge 115+, Safari 26+, Firefox 159+. ~89% global.
- Always ship a fallback via `@supports`: content must be fully visible and usable without the animation.

## Core API

| Piece | Where | Purpose |
|-------|-------|---------|
| `animation-timeline: scroll(<scroller>? <axis>?)` | animated element | Progress = scroll position of a container. `<scroller>`: `nearest` (default) \| `root` \| `self`. `<axis>`: `block` (default) \| `inline` \| `x` \| `y`. |
| `animation-timeline: view(<axis>? <inset>?)` | animated element | Progress = element's visibility in its scrollport (enter → exit). |
| `animation-range: <start> <end>` | animated element | Limit the active window, e.g. `entry 0% cover 40%`. Range names: `cover`, `contain`, `entry`, `exit`, `entry-crossing`, `exit-crossing`. |
| `scroll-timeline: --name <axis>?` | scroll container | Named scroll timeline. |
| `view-timeline: --name <axis>?` | observed element | Named view timeline (animate a different element than the one observed). |
| `timeline-scope: --name` | common ancestor | Expose a named timeline to non-descendant elements. |

## Rules

1. **Declare `animation-timeline` AFTER the `animation` shorthand.** The shorthand resets it to `auto`.
2. Use `linear` easing for scroll-linked progress (bars, parallax); easing curves are fine for reveals.
3. Use `animation-fill-mode: both` so start/end states hold outside the range.
4. Animate only `transform`, `opacity`, `filter`, `clip-path` — compositor-friendly. Never animate `width`, `top`, `margin` on scroll.
5. **Respect `prefers-reduced-motion`**: disable movement, keep content visible.
6. **Progressive enhancement**: put the initial hidden state (e.g. `opacity: 0`) INSIDE `@supports`, never in base styles — otherwise unsupported browsers hide content forever.
7. One orchestrated scroll moment beats fading every section in. Do not reveal-animate every block (see `frontend-design`).
8. Do not apply a view timeline to elements inside `overflow: hidden` ancestors unintentionally — `nearest` picks the closest scroll container.

## Patterns

### Reading progress bar

```css
.progress {
  position: fixed;
  inset: 0 0 auto 0;
  height: 4px;
  background: var(--accent);
  transform-origin: 0 50%;
  /* Unsupported browsers: hidden via the @supports not rule below */
}

@supports (animation-timeline: scroll()) {
  .progress {
    animation: grow-x linear both;
    animation-timeline: scroll(root block);
  }
}
@supports not (animation-timeline: scroll()) {
  .progress { display: none; }
}

@keyframes grow-x {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}
```

### Reveal on enter

```css
@supports (animation-timeline: view()) {
  .reveal {
    animation: reveal ease-out both;
    animation-timeline: view();
    animation-range: entry 0% cover 30%;
  }
}

@keyframes reveal {
  from { opacity: 0; transform: translateY(2rem); }
  to   { opacity: 1; transform: none; }
}
```

### Parallax layer

```css
@supports (animation-timeline: view()) {
  .parallax {
    animation: drift linear both;
    animation-timeline: view();
    animation-range: cover;
  }
}
@keyframes drift {
  from { transform: translateY(-10%); }
  to   { transform: translateY(10%); }
}
```

### Animate element B based on element A (named view timeline)

```css
.page    { timeline-scope: --hero; }
.hero    { view-timeline: --hero block; }
.navbar  {
  animation: solidify linear both;
  animation-timeline: --hero;
  animation-range: exit 0% exit 100%;
}
@keyframes solidify {
  from { background-color: transparent; }
  to   { background-color: var(--surface); }
}
```

### Horizontal scroller progress

```css
.carousel { scroll-timeline: --carousel inline; overflow-x: auto; }
.carousel-indicator {
  animation: grow-x linear both;
  animation-timeline: --carousel;
}
```
(`.carousel-indicator` must be a descendant of `.carousel`, or add `timeline-scope: --carousel` on a shared ancestor.)

## Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  .reveal, .parallax {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
```

## Verification checklist

- [ ] Works in a supporting browser (Chrome) and degrades cleanly with `@supports` forced off.
- [ ] Content fully visible with `prefers-reduced-motion: reduce` (DevTools → Rendering → Emulate).
- [ ] `animation-timeline` declared after every `animation` shorthand.
- [ ] Only compositor properties animated; no layout jank in Performance panel.
- [ ] Mobile: test on touch scroll; avoid huge parallax offsets.

## References

- MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations
- Range visualizer: https://scroll-driven-animations.style/tools/view-timeline/ranges/
