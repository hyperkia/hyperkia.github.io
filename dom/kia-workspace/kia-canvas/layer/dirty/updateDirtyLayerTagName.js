function Index() {
    const dirtyLayer = KIA.state.ui.getProp('dirtyMap').layer;
    if (dirtyLayer.flag !== 'setTagName') return;

    const layerEl = KIA.canvasRefMap[dirtyLayer.id];
    const layerObj = KIA.nodesMap[dirtyLayer.id];

    if (layerEl.tagName === layerObj.tagName) return;

    const attrs = layerEl.attributes;
    const innerHTML = layerEl.innerHTML;

    const newNode = document.createElement(layerObj.tagName);
    for (let a of attrs) newNode.setAttribute(a.name, a.value);
    [...layerEl.childNodes].forEach((cEl)=>{
    	newNode.appendChild(cEl);
    })

    layerEl.after(newNode);
    layerEl.remove();
    KIA.canvasRefMap[dirtyLayer.id] = newNode;
}

export default Index;