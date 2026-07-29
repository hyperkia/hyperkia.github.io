function Index(id){
	if(KIA.dom.read.getObjectStoreNameById(id) !== 'layers') return;

	const duplicateNotAllowTagName = KIA.state.config.getProp('svgShapes');
    let layerObj = KIA.nodesMap[id];
    if(duplicateNotAllowTagName.includes(layerObj.tagName)) {
        layerObj = KIA.dom.read.getClosestDuplicateAllowTagNameLayerObj(layerObj);
        id = layerObj.id;
    }

	const copyObject = {
		layer: id,
	};
	KIA.state.ui.copy(copyObject);
}

export default Index;