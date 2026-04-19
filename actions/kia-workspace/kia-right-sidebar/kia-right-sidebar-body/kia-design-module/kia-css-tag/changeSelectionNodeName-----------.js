function Index(nodeName) {
	KIA.state.layers.setSelectionNodeName(nodeName);
	const id = KIA.state.ui.getSelectionId();	
	KIA.services.idb.core.updateObject('layers', id, {nodeName});
}

export default Index;