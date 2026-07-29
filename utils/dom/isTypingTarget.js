function Index(e) {
  return e.composedPath().some(el =>
    el instanceof HTMLElement &&
    (
      el.tagName === 'INPUT' ||
      el.tagName === 'TEXTAREA' ||
      el.isContentEditable
    )
  );
}

export default Index;