function Index(el) {
  let zIndex = 0;
  while (el && el !== document.body) {
  
    const style = window.getComputedStyle(el);
    const elZIndex = style.zIndex;
    if(elZIndex !== 'auto') zIndex += (+elZIndex);
    el = el.parentElement;
  }

  if(zIndex === 0) return 'auto';
  return zIndex;
}

export default Index;