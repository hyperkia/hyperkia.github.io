
class Index {

	static components = ['kiaEffectPopover'];

	static handler(e){
		Index.components.forEach((c)=>{
			KIA[c]?.handleEvents(e);
		})
	}

}

export default Index;