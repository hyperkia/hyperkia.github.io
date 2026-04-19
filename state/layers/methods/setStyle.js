
import props from '../props.js';

function Index(newLayerObj){
	const id = newLayerObj.id;
	Object.assign(props.map[id].style, newLayerObj.style);
	KIA.observer.layers.observe('setStyle');
}

export default Index;