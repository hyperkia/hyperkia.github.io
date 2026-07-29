function Index(obj) {
	const xy = {};

    xy.x = parseInt((obj.e.clientX * 1) / KIA.state.ui.getProp('canvasZoom'));
    xy.y = parseInt((obj.e.clientY * 1) / KIA.state.ui.getProp('canvasZoom'));
    return xy;
}

export default Index;