function Index() {
	const els = KIA.dom.read.getSelectionLayersElement();
    if(els.length == 0) {        
        return;
    } else {
    	KIA.kiaCanvas.$id.canvasSelection.classList.add('multi-selection-active');
    }

    const rects = [...els].map(el=>KIA.utils.dom.getRect(el));
    const rect = KIA.utils.dom.getCombinedBoundingRect(rects);
    const canvasRect = KIA.utils.dom.getRect(KIA.kiaCanvas);
    KIA.kiaCanvas.$id.canvasSelection.style = `
    	left: ${rect.left+KIA.kiaCanvas.scrollLeft-canvasRect.left}px;
    	top: ${rect.top+KIA.kiaCanvas.scrollTop-canvasRect.top}px;
    	width: ${rect.width}px;
    	height:${rect.height}px;`
    ;
}

export default Index;