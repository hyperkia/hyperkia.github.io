
import props from './props.js';

function Index() {
	let type = 'canvas';
	const id = KIA.state.ui.getSelectionId();
	const obj = KIA.nodesMap[id];
	const objectStore = KIA.dom.read.getObjectStoreNameById(id);

	if(objectStore === 'layers') {
		type = KIA.registry.tags.getUIType(obj.tagName);	
	} else if (objectStore === 'pages') {
		type = 'page';
	}

	return type;
}

export default Index;