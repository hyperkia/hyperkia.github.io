function Index(ids){
	ids = Array.isArray(ids) ? ids : [ids];
	ids.forEach((id)=>{
		KIA.canvasRefMap[id].remove();
		KIA.canvasRefMap[id] = null;
	});	
}

export default Index;