function Index(ids){
	ids = Array.isArray(ids) ? ids : [ids];
	ids.forEach((id)=>{
		KIA.kiaPages._qs(`[data-page="${id}"]`).remove();
	});	
}

export default Index;