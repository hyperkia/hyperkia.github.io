const SVG_NS = "http://www.w3.org/2000/svg";
const css = [];

function createDOM(node) {
  if (!node) return document.createDocumentFragment();

  // create element or fragment
  const isSVG = node.instanceof === 'svg' ? true : false;
  const el = node.tagName
    ? (isSVG
        ? document.createElementNS(SVG_NS, node.tagName)
        : document.createElement(node.tagName))
    : document.createDocumentFragment();

  if(isSVG) el.setAttribute('preserveAspectRatio', 'none');

  if (node.tagName) {
    // support
    el.classList.add('canvas-layer');
    el.dataset.layer = node.id;
    el.setAttribute('draggable', false);

    // apply styles
    if (node.style) {
      css.push(`
        [data-layer="${node.id}"] {${KIA.utils.css.objectToCss(node.style)}}
      `);
    }

    // attributes
    if (node.attributes) {
      const normAttrs = KIA.dom.read.normalizeAttributes(node.attributes);
      for (let key in normAttrs) {
        el.setAttribute(key, normAttrs[key]);
      }
    }

    // Style
    if (node.style) {
        const normStyle = KIA.dom.read.normalizeStyle(node.style);
        Object.assign(el.style, normStyle);            
    }

    // content
    if (node.textContent) {
      el.textContent = node.textContent;
    }

    KIA.canvasRefMap[node.id] = el;
  }

  // children
  if (node.children && node.children.length) {
    node.children.forEach(childId => {
      const childNode = KIA.nodesMap[childId];
      if (!childNode) return;

      el.appendChild(createDOM(childNode));
    });
  }

  return el;
}

function Index() {

    const dirtyLayer = KIA.state.ui.getProp('dirtyMap').layer;
    if(dirtyLayer.flag !== 'duplicatePasteLayer') return;

    css.length = 0;

    const layerObj = KIA.nodesMap[dirtyLayer.id];
    const dom = createDOM(layerObj);
    const parentEl = KIA.canvasRefMap[layerObj.parent];

    KIA.kiaCanvas.$id.style.innerHTML += css.join('');
    parentEl.appendChild(dom);
}

export default Index;