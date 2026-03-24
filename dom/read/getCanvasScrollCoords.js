function Index(obj) {
    	
    const xy = {};
    const canvasRect = KIA.utils.dom.getRect(KIA.kiaCanvas);
    xy.x = parseInt(Math.abs(obj.e.clientX - canvasRect.left) + KIA.kiaCanvas.scrollLeft);
    xy.y = parseInt(Math.abs(obj.e.clientY - canvasRect.top) + KIA.kiaCanvas.scrollTop);    
	return xy;
}

export default Index;