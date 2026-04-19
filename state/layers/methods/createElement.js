
import props from '../props.js';

function Index(layerObj){
	props.map[layerObj.id] = layerObj;
	KIA.nodesMap[layerObj.id] = layerObj;
}

export default Index;