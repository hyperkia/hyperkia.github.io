
import props from '../props.js';

function Index(layers){
	props.map = layers;
	Object.assign(KIA.nodesMap, layers);
	KIA.observer.layers.observe('renderLayers');
}

export default Index;