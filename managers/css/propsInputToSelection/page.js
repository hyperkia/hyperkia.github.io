
import propsHandler from '../propsHandler/index.js';

let debounceTimeout = null;

function Index(css) {

	for(let p in css) {
		const propHandler = KIA.utils.string.underScoreToCamelCase(p);
		if(propsHandler[propHandler]) propsHandler[propHandler](css, 'propsInputToSelection');	
	}

	const pageObj = KIA.dom.read.getSelectionPageObject();
	const pageEl = KIA.dom.read.getSelectionPageElement();
	Object.assign(pageEl.style, css);


	clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
    	const pageNewObj = {
    		key: pageObj.key,
    		css,
    	}
        KIA.state.pages.setSelectionProperties(pageNewObj);
		KIA.services.idb.core.updateObject('pages', pageNewObj.key, pageNewObj);
    }, 150);
}

export default Index;