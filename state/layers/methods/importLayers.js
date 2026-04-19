
import props from '../props.js';

function Index(){
	Object.assign(props.map, layers);
	KIA.observer.layers.observe('importLayers');
}

export default Index;