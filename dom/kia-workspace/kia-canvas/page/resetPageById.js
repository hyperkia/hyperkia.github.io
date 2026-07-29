function Index(id){
	const pageObj = KIA.nodesMap[id];
	const pageEl = KIA.canvasRefMap[id];

	Object.assign(pageEl.style, pageObj.style);
}

export default Index;