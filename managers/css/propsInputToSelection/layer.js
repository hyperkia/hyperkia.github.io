

import propsHandler from '../propsHandler/index.js';

let debounceTimeout = null;

function Index(css) {
	for(let p in css) {
		const propHandler = KIA.utils.string.underScoreToCamelCase(p);
		if(propsHandler[propHandler]) propsHandler[propHandler](css, 'propsInputToSelection');	
	}

	const layerEl = KIA.dom.read.getSelectionLayerElement();
	const layerObj = KIA.dom.read.getSelectionLayerObject();
	Object.assign(layerEl.style, css);
	
	if(css.width || css.height || css.left || css.top || css.rotate || css.rotate90) KIA.dom.kiaCanvas.createSelectionLayersOutline();

	clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
    	const layerNewObj = {
    		key: layerObj.key,
    		css,
    	};
        KIA.state.layers.setSelectionProperties(layerNewObj);
		KIA.services.idb.core.updateObject('layers', layerNewObj.key, layerNewObj);
    }, 150);
}

export default Index;