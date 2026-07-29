
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(e){
		if(props.eTarget.matches('.rule-prop') || props.eTarget.matches('.rule-value')) this.pasteStyle(e);
	}

	static pasteStyle(e){
		const styleRulesEl = props.eTarget.closest('.style-rules');
		const cssText = e.clipboardData.getData("text");
		if(cssText.indexOf(':') === -1) return;
		methods.pasteStyle(cssText, styleRulesEl);
		props.eTarget.closest('.style-rule').remove();
	}
	
}

export default Index;
