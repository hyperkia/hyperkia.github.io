function Index(obj) {
	const xy = {};
	const activePageRect = KIA.utils.dom.getRect(obj.activePage);
	xy.x = parseInt(Math.abs(obj.e.clientX - activePageRect.left) / KIA.state.ui.canvasZoom);
    xy.y = parseInt(Math.abs(obj.e.clientY - activePageRect.top) / KIA.state.ui.canvasZoom);
    return xy;
}

export default Index;