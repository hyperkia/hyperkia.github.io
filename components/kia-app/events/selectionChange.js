
class Index {

	static components = [
		'kiaDesignModule', 'kiaCssTag', 'kiaCanvas', 'kiaCssTypography', 
		'kiaLayers', 'kiaCssFilter', 'kiaCssEffect'
	];

	static handler(e){		
		Index.components.forEach((c)=>{
			if(e.detail.source === KIA[c]) return;
			KIA[c]?.handleEvents(e);
		})
	}

}

export default Index;