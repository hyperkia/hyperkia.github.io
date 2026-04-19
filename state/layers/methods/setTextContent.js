
import props from '../props.js';

function Index(newLayerObj){
	const id = newLayerObj.id;
	props.map[id].textContent = newLayerObj.textContent;
	KIA.observer.layers.observe('setTextContent');
}

export default Index;