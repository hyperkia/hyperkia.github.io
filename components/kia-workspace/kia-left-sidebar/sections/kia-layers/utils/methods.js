const Methods = {
	activeSelection(){
		const id = KIA.state.ui.getSelectionId();
		KIA.kiaLayers._qs('.node.selection')?.classList.remove('selection');
		KIA.layersRefMap[id]?.classList.add('selection');
	}
};

export default Methods;