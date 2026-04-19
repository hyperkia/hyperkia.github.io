function Index(layerObj) {
    KIA.services.idb.core.addObject('layers', layerObj);
    KIA.state.ui.setActiveTool('triangle');
    KIA.state.layers.createElement(layerObj);

    const parentKey = layerObj.parent;

    // Page
    if(KIA.state.pages.getProp('map')[parentKey]) {
        KIA.state.pages.addLayerToParent(layerObj);
        const parentObj = KIA.nodesMap[parentKey];
        KIA.services.idb.core.replaceObjectByKey('pages', parentObj);
    }

    // Layer
    if(KIA.state.layers.getProp('map')[parentKey]) {
        KIA.state.layers.addLayerToParent(layerObj);  
        const parentObj = KIA.nodesMap[parentKey];
        KIA.services.idb.core.replaceObjectByKey('layers', parentObj);
    }
}

export default Index;