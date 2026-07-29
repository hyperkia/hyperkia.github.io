
function Index(e){
	const elements = KIA.kiaCanvas.shadowRoot.elementsFromPoint(e.clientX, e.clientY);
	return elements.find((el) => {
		const lObj = KIA.nodesMap[el.dataset.layer];
		if(lObj && (lObj.instanceof==='html' || lObj.tagName==='svg')) return el;
	});
}

export default Index;