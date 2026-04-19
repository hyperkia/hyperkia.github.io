


const css = [];
const SVG_NS = "http://www.w3.org/2000/svg";

function createDOM(node, layers) {
  if (!node) return document.createDocumentFragment();

  // create element or fragment
  const isSVG = node.instanceof === 'svg' ? true : false;
  const el = node.nodeName
    ? (isSVG
        ? document.createElementNS(SVG_NS, node.nodeName)
        : document.createElement(node.nodeName))
    : document.createDocumentFragment();

  if (node.nodeName) {
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

    // content
    if (node.textContent) {
      el.textContent = node.textContent;
    }

    KIA.canvasRefMap[node.id] = el;
  }

  // children (IDs → lookup in layers)
  if (node.children && node.children.length) {
    node.children.forEach(childId => {
      const childNode = layers[childId];
      if (!childNode) return;

      el.appendChild(createDOM(childNode, layers));
    });
  }

  return el;
}

function Index() {
  const pages = KIA.state.pages.getProp('map');
  const layers = KIA.state.layers.getProp('map');

  // reset css buffer (important)
  css.length = 0;

  const renderPagesKey = [...KIA.kiaCanvas._qsAll('[data-render="true"]')]
    .map(p => p.dataset.page);

  for (let [id, pObj] of Object.entries(pages)) {
    if (renderPagesKey.includes(id)) continue;

    const pageEl = KIA.canvasRefMap[id];

    // render root layers (IDs)
    if (pObj.children && pObj.children.length) {
      pObj.children.forEach(rootId => {
        const rootLayer = layers[rootId];
        if (!rootLayer) return;

        const dom = createDOM(rootLayer, layers);
        pageEl.appendChild(dom);
      });
    }
  }

  // inject styles
  KIA.kiaCanvas.$id.style.innerHTML += css.join('');
}

export default Index;