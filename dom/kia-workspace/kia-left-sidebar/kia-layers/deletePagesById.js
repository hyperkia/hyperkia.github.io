function Index(ids){
	ids = Array.isArray(ids) ? ids : [ids];
	KIA.kiaLayers.$id.layers.appendChild(KIA.kiaLayers.$id.itemContent);
	ids.forEach((id)=>{
		KIA.kiaLayers._qs(`[data-item="${id}"]`).remove();
	});
	KIA.dom.share.removeDisConnectedDomNodes(KIA.layersRefMap);
}

export default Index;