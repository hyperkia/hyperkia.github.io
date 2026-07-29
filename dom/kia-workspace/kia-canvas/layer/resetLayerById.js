function Index(id) {
    const layerObj = KIA.nodesMap[id];
    const layerEl = KIA.canvasRefMap[id];
    const parentEl = KIA.canvasRefMap[layerObj.parent];

    Object.assign(layerEl.style, layerObj.style);
    for (let [attrName, attrValue] of Object.entries(layerObj.attributes)) {
        layerEl.setAttribute(attrName, attrValue);
    }

    // attributes
    if (layerObj.attributes) {
        const normAttrs = KIA.dom.read.normalizeAttributes(layerObj.attributes);
        for (let key in normAttrs) {
            layerEl.setAttribute(key, normAttrs[key]);
        }
    }

    // Style
    if (layerObj.style) {
        const normStyle = KIA.dom.read.normalizeStyle(layerObj.style);
        Object.assign(layerEl.style, normStyle);
    }

    // Stack
    if (layerObj.stack?.length) {
        const normStack = KIA.dom.read.normalizeStack(layerObj);
        Object.assign(layerEl.style, normStack.style);
        for (let attr in normStack.attributes) {
            layerEl.setAttribute(attr, normStack.attributes[attr]);
        }
    }

    if(layerObj.textContent) layerEl.innerHTML = layerObj.textContent;
    if (parentEl !== layerEl.parentElement) parentEl.appendChild(layerEl);

    KIA.dom.kiaCanvas.createSelectionLayersOutline();
}

export default Index;