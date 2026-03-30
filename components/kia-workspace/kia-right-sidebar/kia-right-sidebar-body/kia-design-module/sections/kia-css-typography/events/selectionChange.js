 
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(e){
		const selectionEl = KIA.dom.read.getSelectionElement();
		const selectionCssObj = KIA.dom.read.getSelectionCssObject();
		if(!(selectionEl && selectionCssObj)) return;
		const computedFontFamily = window.getComputedStyle(selectionEl)['font-family'];
		const cssObjFontFamily = selectionCssObj['font-family'];

		let result = cssObjFontFamily;
		if(!cssObjFontFamily) {
			result = computedFontFamily.slice(0, 16);
			if(result !== computedFontFamily) result += '...';
			result += ` (Inherit)`;
		}
		props.root.style.setProperty('--selection--font-family', `"${result.replaceAll('"','')}"`);
	}

}

export default Index;