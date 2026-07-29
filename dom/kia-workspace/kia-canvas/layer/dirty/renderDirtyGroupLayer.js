function Index() {
    const dirtyLayer = KIA.state.ui.getProp('dirtyMap').layer;
    if(dirtyLayer.flag !== 'groupLayer') return;

    const targetLayerObj = KIA.nodesMap[dirtyLayer.id];
    const groupLayerObj = KIA.nodesMap[targetLayerObj.parent];

    const targetLayerEl = KIA.canvasRefMap[targetLayerObj.id];
    Object.assign(targetLayerEl.style, targetLayerObj.style);
    const groupLayerEl = document.createElement(groupLayerObj.tagName);
    KIA.canvasRefMap[groupLayerObj.id] = groupLayerEl;
    groupLayerEl.classList.add('canvas-layer');
    groupLayerEl.setAttribute('data-layer', groupLayerObj.id);    
    Object.assign(groupLayerEl.style, groupLayerObj.style);
    groupLayerEl.dataset.title = groupLayerObj.title;

    targetLayerEl.after(groupLayerEl);
    groupLayerEl.appendChild(targetLayerEl); 
}

export default Index;