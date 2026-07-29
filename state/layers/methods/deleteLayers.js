

function Index(ids){
	ids.forEach((id)=>{
		delete KIA.nodesMap[id];
	})
	KIA.observer.layers.observe('deleteLayers');
}

export default Index;