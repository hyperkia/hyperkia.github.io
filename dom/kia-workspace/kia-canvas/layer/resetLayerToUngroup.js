function Index(selectionId){
	const selectionObj = KIA.nodesMap[selectionId];
	const selectionEl = KIA.canvasRefMap[selectionId];
	Object.assign(selectionEl.style, selectionObj.style);

	const parentEl = selectionEl.parentElement;
	const parentElId = parentEl.dataset.layer || parentEl.dataset.page;
	if(selectionObj.parent !== parentElId) {
		parentEl.after(selectionEl);
		parentEl.remove();		
	}
}

export default Index;