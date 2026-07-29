
class Index {

	static components = ['kiaContextMenu', 'kiaCanvas'];

	static handler(e){
		Index.components.forEach((c)=>{
			KIA[c]?.handleEvents(e);
		})
	}

}

export default Index;