function Index(layerObj) {
    KIA.services.idb.core.addObject('layers', layerObj);
    KIA.state.ui.setActiveTool('triangle');
    KIA.state.layers.createElement(layerObj);

    const parentKey = layerObj.parent;
    const parentObjectStore = KIA.dom.read.getObjectStoreNameById(parentKey);

    // Page
    if(parentObjectStore === 'pages') {
        KIA.state.pages.addLayerToParent(layerObj);
        const parentObj = KIA.nodesMap[parentKey];
        KIA.services.idb.core.replaceObjectByKey('pages', parentObj);
    }

    // Layer
    if(parentObjectStore === 'layers') {
        KIA.state.layers.addLayerToParent(layerObj);  
        const parentObj = KIA.nodesMap[parentKey];
        KIA.services.idb.core.replaceObjectByKey('layers', parentObj);
    }
}

export default Index;