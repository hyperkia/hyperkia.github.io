function Index(layerObjs) {
    KIA.services.idb.core.addObject('layers', layerObjs);
    KIA.state.layers.createElements(layerObjs);
    KIA.state.ui.setActiveTool('triangle');

    const svgObj = layerObjs[0];

    let parentStore = '';
    if(KIA.state.layers.getProp('map')[svgObj.parent]) parentStore = 'layers';
    if(KIA.state.pages.getProp('map')[svgObj.parent]) parentStore = 'pages';

    if(parentStore === 'layers') {
        KIA.state.layers.addLayerToParent(svgObj);    	
    	const parentObj = KIA.nodesMap[svgObj.parent];
    	KIA.services.idb.core.replaceObjectByKey('layers', parentObj);
    } else if (parentStore === 'pages') {
    	KIA.state.pages.addLayerToParent(svgObj);
    	const parentObj = KIA.nodesMap[svgObj.parent];
    	KIA.services.idb.core.replaceObjectByKey('pages', parentObj);
    }
    
}

export default Index;