function Index(resolveFonts) {

    const layersNewObj = {};
    const layers = KIA.state.layers.getLayers();

    let ids = new Set();

    for (const [lId, lObj] of Object.entries(layers)) {
        const lObj = layers[lId];
        if (!lObj) return;
        
        if (lObj.textContent) {

            // Layer textContent
            const parser = new DOMParser();
            const doc = parser.parseFromString(lObj.textContent, "text/html");
            const els = doc.querySelectorAll("*");

            els.forEach((el) => {
                const elFont = el.style.fontFamily;
                if (elFont && resolveFonts[elFont]) {
                    ids.add(lId);
                    Object.assign(el.style, resolveFonts[elFont]);
                }
            });
            lObj.textContent = doc.body.innerHTML;

            // Layer
            const layerFont = lObj.style['font-family'];
            if (layerFont && resolveFonts[layerFont]) {
                ids.add(lId);
                layersNewObj[lId] = {
                    id: lId,
                    style: resolveFonts[layerFont]
                }
            }
        }
    }
    ids = [...ids];

    KIA.state.ui.setDirtyMap({
        layer: {
            ids,
            style: Object.keys(resolveFonts),
            flag: 'resolveMissFont',
        }
    });

    KIA.state.layers.updateLayerFont(layersNewObj);
    KIA.state.ui.resetDirtyMap();

    const updateLayers = [];
    ids.forEach((id)=>{
        updateLayers.push(KIA.nodesMap[id]);
    });
    KIA.services.idb.core.updateObjects('layers', updateLayers);
}

export default Index;