function Index(ids){
	ids = Array.isArray(ids) ? ids : [ids];
	ids.forEach((id)=>{
		KIA.layersRefMap[id]?.remove();
		KIA.layersRefMap[id] = null;
	});	
}

export default Index;