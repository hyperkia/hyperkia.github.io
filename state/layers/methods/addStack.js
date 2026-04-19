
import props from '../props.js';

function Index(newLayerObj){
	const id = newLayerObj.id;
	const layerObj = props.map[id];
	layerObj.stack.push(newLayerObj.newStack);
}

export default Index;