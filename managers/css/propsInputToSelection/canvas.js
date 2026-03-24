

import propsHandler from '../propsHandler/index.js';

let debounceTimeout = null;

function Index(css) {

	for(let p in css) {
		const propHandler = KIA.utils.string.underScoreToCamelCase(p);
		if(propsHandler[propHandler]) propsHandler[propHandler](css, 'propsInputToSelection');	
	}
	
	Object.assign(KIA.kiaCanvas.style, css);
	KIA.state.canvas.updateCss(css);

	clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
    	const css = KIA.state.canvas.css;
        KIA.services.idb.core.updateKeyValueObject('canvas', {css});		
    }, 150);
}

export default Index;