
const scale = {
	pagesX: 0,
	pagesY: 0,
    zoom: 1,
}

function Index(e) {	
    e.preventDefault();

    scale.pagesX = KIA.state.ui.getProp('pagesX');
    scale.pagesY = KIA.state.ui.getProp('pagesY');
    scale.zoom = KIA.state.ui.getProp('canvasZoom');

    const canvasRect = KIA.utils.dom.getRect(KIA.kiaCanvas);

    const clientX = e.clientX - canvasRect.left + KIA.kiaCanvas.scrollLeft;
    const clientY = e.clientY - canvasRect.top + KIA.kiaCanvas.scrollTop;

    let xs = (clientX - scale.pagesX) / scale.zoom,
        ys = (clientY - scale.pagesY) / scale.zoom,
        delta = (e.wheelDelta ? e.wheelDelta : -e.deltaY);
    (delta > 0) ? (scale.zoom *= 1.2) : (scale.zoom /= 1.2);

    scale.zoom = +(scale.zoom.toFixed(2));

    if (scale.zoom > 10.7) scale.zoom = 10.7;
    if (scale.zoom < 0.05) scale.zoom = 0.05;

    scale.pagesX = clientX - xs * scale.zoom;
    scale.pagesY = clientY - ys * scale.zoom;

    KIA.state.ui.setCanvasScale(scale);    
}

export default Index;