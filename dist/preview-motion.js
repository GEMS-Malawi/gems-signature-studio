(() => {
  const area = document.querySelector('.preview-scroll');
  if (!area) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'preview-motion-toggle';
  button.textContent = 'Pause preview motion';
  button.setAttribute('aria-pressed', 'false');
  area.before(button);
  let paused = false, hovering = false, focused = false, direction = 1;
  let position = area.scrollLeft;
  let last = 0, resumeAt = performance.now() + 1800, frame;
  const stopTemporarily = () => { resumeAt = performance.now() + 6000; };
  button.addEventListener('click', () => {
    paused = !paused;
    button.textContent = paused ? 'Resume preview motion' : 'Pause preview motion';
    button.setAttribute('aria-pressed', String(paused));
    resumeAt = performance.now() + 800;
  });
  area.addEventListener('pointerenter', () => { hovering = true; });
  area.addEventListener('pointerleave', () => { hovering = false; resumeAt = performance.now() + 1000; });
  area.addEventListener('focusin', () => { focused = true; });
  area.addEventListener('focusout', () => { focused = false; stopTemporarily(); });
  for (const event of ['wheel', 'pointerdown', 'touchstart', 'keydown']) {
    area.addEventListener(event, stopTemporarily, { passive: true });
  }
  function tick(now) {
    const elapsed = last ? Math.min(now - last, 50) / 1000 : 0;
    last = now;
    const max = Math.max(0, area.scrollWidth - area.clientWidth);
    button.hidden = max <= 1 || reducedMotion.matches;
    if (max > 1 && !reducedMotion.matches && !paused && !hovering && !focused && !document.hidden && now >= resumeAt) {
      const distanceToEnd = direction > 0 ? max - area.scrollLeft : area.scrollLeft;
      const speed = 12 * Math.min(1, Math.max(0.25, distanceToEnd / 35));
      position = Math.max(0, Math.min(max, position + direction * speed * elapsed));
      area.scrollLeft = position;
      if ((direction > 0 && area.scrollLeft >= max - 1) || (direction < 0 && area.scrollLeft <= 1)) {
        direction *= -1;
        resumeAt = now + 1800;
      }
    } else {
      position = area.scrollLeft;
    }
    frame = requestAnimationFrame(tick);
  }
  frame = requestAnimationFrame(tick);
  window.addEventListener('pagehide', () => cancelAnimationFrame(frame), { once: true });
})();


