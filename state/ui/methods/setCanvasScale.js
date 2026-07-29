
import props from '../props.js';

function Index(obj){
	if(obj.zoom) props.canvasZoom = obj.zoom;
	if(obj.pagesX) props.pagesX = obj.pagesX;
	if(obj.pagesY) props.pagesY = obj.pagesY;
	KIA.observer.ui.observe('changeCanvasScale');
}

export default Index;