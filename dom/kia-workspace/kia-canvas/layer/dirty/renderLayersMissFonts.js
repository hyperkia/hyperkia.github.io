function Index(){
    const dirtyLayer = KIA.state.ui.getProp('dirtyMap').layer;
    if(dirtyLayer.flag !== 'resolveMissFont') return;

    const els = [];
    dirtyLayer.ids.forEach((lId)=>{
        els.push(KIA.canvasRefMap[lId]);
    })

    const layers = KIA.state.layers.getLayers();
    els.forEach((lEl)=>{
        const lObj = layers[lEl.dataset.layer];        
        if(!(lObj)) return;
        Object.assign(lEl.style, lObj.style);
        if(lObj.textContent) lEl.innerHTML = lObj.textContent;
    });
}

export default Index;