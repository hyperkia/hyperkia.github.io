function Index(){
	const childrens = KIA.dom.read.getSelectionLayerElement().querySelectorAll('*');
	const layerObj = KIA.dom.read.getSelectionLayerObject();
	childrens.forEach( c => Object.assign(c.style, layerObj.scss) );
}

export default Index;