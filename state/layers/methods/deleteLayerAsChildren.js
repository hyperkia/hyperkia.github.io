
import props from '../props.js';

function Index(id){
	const layerObj = KIA.nodesMap[id];
	const parentObj = props.map[layerObj.parent];
	const deleteIndex = parentObj.children.indexOf(layerObj.id);
	if (deleteIndex !== -1) parentObj.children.splice(deleteIndex, 1);
}

export default Index;