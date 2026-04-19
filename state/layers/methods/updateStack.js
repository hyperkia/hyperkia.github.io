
import props from '../props.js';

function Index(newLayerObj){
	const updateStack = newLayerObj.updateStack;
	const stackId = updateStack.id;
	const layerStack = props.map[newLayerObj.id].stack;

	layerStack.forEach((s, i)=>{
		if(s.id === updateStack.id) {
			if('enable' in updateStack) s.enable = updateStack.enable;
			if('value' in updateStack) Object.assign(s.value, updateStack.value);
		}
	});
}

export default Index;