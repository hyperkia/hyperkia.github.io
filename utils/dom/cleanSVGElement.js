function Index(svgEl) {
  if (!svgEl || svgEl.nodeName !== "svg") return null;

  // 1. Remove unsafe elements
  svgEl.querySelectorAll("script, style, foreignObject").forEach(el => el.remove());

  // 2. Clean attributes
  svgEl.querySelectorAll("*").forEach(el => {
    [...el.attributes].forEach(attr => {
      const name = attr.name;

      // remove event handlers (onclick, onload, etc)
      if (name.startsWith("on")) {
        el.removeAttribute(name);
      }

      // remove external references
      if (name === "href" || name === "xlink:href") {
        el.removeAttribute(name);
      }
    });
  });
  return svgEl;
}


export default Index;