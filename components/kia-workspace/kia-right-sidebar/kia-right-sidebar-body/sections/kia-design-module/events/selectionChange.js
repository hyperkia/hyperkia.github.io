
import props from '../utils/props.js';

class Index {

	static handler(e){
		const selectionType = KIA.dom.read.getSelectionDesignUiType();
		for(const c of props.root.shadowRoot.children) {
			if(c.tagName.indexOf('KIA-CSS') === 0) c.setAttribute('data-selection-type', selectionType);
		} 
	}

}

export default Index;