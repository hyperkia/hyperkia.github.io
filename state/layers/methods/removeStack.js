
import props from '../props.js';

function Index(newLayerObj){
	const id = newLayerObj.id;
	const layerStack = props.map[id].stack;
	layerStack.forEach((s, i)=>{
		if(s.id === newLayerObj.stackId) layerStack.splice(i, 1);
	});
}

export default Index;