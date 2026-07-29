function Index(lObj){
	let result = null;
	lObj.stack.forEach((s)=>{
		if(s.type !== "gradient") return;
		result = s;
	});
	return result;
}

export default Index;