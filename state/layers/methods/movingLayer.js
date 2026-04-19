
import props from '../props.js';

function Index(layerObj){
	Object.assign(props.map[layerObj.id].style, layerObj.style);
	KIA.observer.layers.observe('setLayerDirtyFlagToPropField');
}

export default Index;