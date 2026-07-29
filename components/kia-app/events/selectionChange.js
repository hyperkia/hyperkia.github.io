
class Index {

	static components = [
		'kiaDesignModule', 'kiaCssTag', 'kiaCanvas', 'kiaCssTypography', 
		'kiaLayers', 'kiaCssFilter', 'kiaCssEffect', 'kiaCodeModule', 'kiaPages', 
	];

	static handler(e){
		Index.components.forEach((c)=>{			
			KIA[c]?.handleEvents(e);
		})
	}

}

export default Index;