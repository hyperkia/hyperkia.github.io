 
const css = [];
const SVG_NS = "http://www.w3.org/2000/svg";

function createDOM(node) {
  if (!node /*|| node.style.visibility === 'hidden'*/) return document.createDocumentFragment();

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
    el.dataset.title = node.title;

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

    // Stack
    if (node.stack?.length) {
      const normStack = KIA.dom.read.normalizeStack(node);
      Object.assign(el.style, normStack.style);
      for (let attr in normStack.attributes) {
        el.setAttribute(attr, normStack.attributes[attr]);
      }
    }

    // content
    if (node.textContent) {
      el.innerHTML = node.textContent;
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
  const pages = KIA.state.pages.getPages();

  // reset css buffer (important)
  css.length = 0;

  const renderPagesKey = [...KIA.kiaCanvas._qsAll('[data-render="true"]')]
    .map(p => p.dataset.page);

  for (let [id, pObj] of Object.entries(pages)) {
    if (renderPagesKey.includes(id)) continue;
    if(KIA.kiaCanvas._qsAll('*').length > 5500) {
      console.warn('DOM Limit Exceed, Max Layers Size 5500');
      console.info('DOM Limit Exceed, Max Layers Size 5500');
      console.log('DOM Limit Exceed, Max Layers Size 5500');
      console.error('DOM Limit Exceed, Max Layers Size 5500');
      break;
    }

    const pageEl = KIA.canvasRefMap[id];
    if(!pageEl) continue;

    // render root childrens
    if (pObj.children && pObj.children.length) {
      pObj.children.forEach(rootId => {
        const rootLayer = KIA.nodesMap[rootId];
        if (!rootLayer) return;

        const dom = createDOM(rootLayer);
        pageEl.appendChild(dom);
      });
    }

    pageEl.dataset.render = "true";
    KIA.utils.svg.resolveClipping(pageEl);
    KIA.utils.svg.resolveSvgText(pageEl);
  }

  KIA.kiaCanvas.$id.style.innerHTML += css.join('');
  
  
}

export default Index;