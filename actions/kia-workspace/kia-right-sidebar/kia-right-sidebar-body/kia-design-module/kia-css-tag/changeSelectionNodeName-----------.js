function Index(nodeName) {
	KIA.state.layers.setSelectionNodeName(nodeName);
	const key = KIA.state.ui.selectionKeys.values().next().value;	
	KIA.services.idb.core.updateObject('layers', key, {nodeName});
}

export default Index;