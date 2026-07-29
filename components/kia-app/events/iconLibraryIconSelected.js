

class Index {

	static components = ['kiaCanvasTools', 'kiaCanvas'];

	static handler(e){	
		Index.components.forEach((c)=>{			
			KIA[c]?.handleEvents(e);
		})
	}

}

export default Index;