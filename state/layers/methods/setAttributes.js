
import props from '../props.js';

function Index(newLayerObj){
	const id = newLayerObj.id;
	Object.assign(props.map[id].attributes, newLayerObj.attributes);
	KIA.observer.layers.observe('setAttributes');
}

export default Index;