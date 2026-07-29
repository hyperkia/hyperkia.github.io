function Index(obj){
	for(let elRefId in obj) {
		if(!obj[elRefId]?.isConnected) {
			obj[elRefId] = null;
			delete obj[elRefId];
		}
	}
}

export default Index;