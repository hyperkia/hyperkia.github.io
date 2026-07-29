 
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(e){
		const selectionId = KIA.state.ui.getSelectionId();
		const selectionObjStyle = KIA.nodesMap[selectionId]?.style || KIA.state.canvas.getProp('style');		
		const selectionEl = KIA.canvasRefMap[selectionId] || KIA.kiaCanvas;

		if(!(selectionEl && selectionObjStyle)) return;
		const computedFontFamily = window.getComputedStyle(selectionEl)['font-family'];
		const cssObjFontFamily = selectionObjStyle['font-family'];

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