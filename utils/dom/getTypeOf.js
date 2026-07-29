function Index(value){
	return Object.prototype.toString
    .call(value)
    .slice(8, -1)
    .toLowerCase();
}

export default Index;