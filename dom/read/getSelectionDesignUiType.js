
import props from './props.js';

function Index() {
	let type = 'canvas';
	const id = KIA.state.ui.getSelectionId();
 
	const layerObj = KIA.state.layers.getProp('map')?.[id];
	if(layerObj) type = KIA.registry.tags.getUIType(layerObj.nodeName);	

	const pageObj = KIA.state.pages.getProp('map')?.[id];
	if(pageObj) type = 'page';

	return type;
}

export default Index;