function Index(id){
	const obj = KIA.nodesMap[id];
    if(!obj) return;

	if(obj.instanceof === 'html') {
        return id;
    } else if(obj.instanceof === 'svg') {        
    	return KIA.canvasRefMap[id]?.closest('svg').dataset.layer;
    }
}

export default Index;