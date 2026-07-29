function Index(ids){
	ids = Array.isArray(ids) ? ids : [ids];

	ids.forEach((id)=>{
		KIA.canvasRefMap[id].remove();
		KIA.canvasRefMap[id].querySelectorAll('*').forEach( l => l.remove() );		
		KIA.kiaCanvas.$id['pageName'+id].remove();
		delete KIA.canvasRefMap[id];
	});
	
	KIA.dom.share.removeDisConnectedDomNodes(KIA.canvasRefMap);	
}

export default Index;