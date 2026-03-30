
import props from '../../../props/index.js';
import text from './text/index.js';
import vectorMask from './vectorMask/index.js';
import vectorFill from './vectorFill/index.js';
import raster from './raster/index.js';
import image from './image/index.js';


function Index() {
	const l = props.activeParseLayer.layer;
	
	if (l.text) return text();
	if (l.vectorMask) return vectorMask();
	if (l.vectorFill) return vectorFill();
	// if (l.adjustment) return "adjustment";
	// if (l.placedLayer) return image();
	if (l.canvas) return raster();
	// return "unknown";	
}

export default Index; 









