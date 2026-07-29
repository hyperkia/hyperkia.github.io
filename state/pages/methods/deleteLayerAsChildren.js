
import props from '../props.js';

function Index(id){
	const layerObj = KIA.nodesMap[id];
	const pageObj = KIA.nodesMap[layerObj.parent];
	const deleteIndex = pageObj.children.indexOf(layerObj.id);
	if (deleteIndex !== -1) pageObj.children.splice(deleteIndex, 1);
}

export default Index;