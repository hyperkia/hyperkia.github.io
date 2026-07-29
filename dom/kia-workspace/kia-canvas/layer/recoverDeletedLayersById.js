const SVG_NS = "http://www.w3.org/2000/svg";

function createDOM(node) {
    if (!node) return document.createDocumentFragment();

    // create element or fragment
    const isSVG = node.instanceof === 'svg' ? true : false;
    const el = node.tagName ?
        (isSVG ?
            document.createElementNS(SVG_NS, node.tagName) :
            document.createElement(node.tagName)) :
        document.createDocumentFragment();

    if (isSVG) el.setAttribute('preserveAspectRatio', 'none');

    if (node.tagName) {
        // support
        el.classList.add('canvas-layer');
        el.dataset.layer = node.id;
        el.setAttribute('draggable', false);

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

    if (node.children && node.children.length) {
        node.children.forEach(childId => {
            const childNode = KIA.nodesMap[childId];
            if (!childNode) return;

            el.appendChild(createDOM(childNode));
        });
    }

    return el;
}

function Index(id) {
    const layerObj = KIA.nodesMap[id];
    const dom = createDOM(layerObj);
    const parentObj = KIA.nodesMap[layerObj.parent];
    const parentEl = KIA.canvasRefMap[layerObj.parent];    
    const childrensId = parentObj.children;

    childrensId.forEach(id => {
        const el = KIA.canvasRefMap[id];
        if (el) parentEl.appendChild(el);
    });

    KIA.dom.kiaLayers.updateLayersPanel();
    KIA.dom.kiaLayers.updateNodeChildrenLength();
}

export default Index;