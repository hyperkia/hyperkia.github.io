
class Index {

	static components = ['kiaCanvas'];

	static handler(e){
		Index.components.forEach((c)=>{
			KIA[c]?.init?.(e); 
		}) 
	}

}

export default Index;