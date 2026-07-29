function Index(layerObjs) {
    KIA.services.idb.core.addObject('layers', layerObjs);
    KIA.state.layers.createElements(layerObjs);
    KIA.state.ui.setActiveTool('triangle');

    const svgObj = layerObjs[0];
    const parentObjectStore = KIA.dom.read.getObjectStoreNameById(svgObj.parent);

    if(parentObjectStore === 'layers') {
        KIA.state.layers.addLayerToParent(svgObj);    	
    	const parentObj = KIA.nodesMap[svgObj.parent];
    	KIA.services.idb.core.replaceObjectByKey('layers', parentObj);
    } else if (parentObjectStore === 'pages') {
    	KIA.state.pages.addLayerToParent(svgObj);
    	const parentObj = KIA.nodesMap[svgObj.parent];
    	KIA.services.idb.core.replaceObjectByKey('pages', parentObj);
    }
    
}

export default Index;