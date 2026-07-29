

class Index {

	static components = ['kiaLeftSidebar'];

	static handler(e){	
		Index.components.forEach((c)=>{			
			KIA[c]?.handleEvents(e);
		})
	}

}

export default Index;