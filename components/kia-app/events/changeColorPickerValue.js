

class Index {

	static components = ['kiaCssTypography', 'kiaCssFill', 'kiaCssStroke', 'kiaEffectPopover'];

	static handler(e){	
		Index.components.forEach((c)=>{			
			KIA[c]?.handleEvents(e);
		})
	}

}

export default Index;