function Index(obj) {
	const xy = {};

    xy.x = parseInt((obj.e.clientX * 1) / KIA.state.ui.canvasZoom);
    xy.y = parseInt((obj.e.clientY * 1) / KIA.state.ui.canvasZoom);
    return xy;
}

export default Index;