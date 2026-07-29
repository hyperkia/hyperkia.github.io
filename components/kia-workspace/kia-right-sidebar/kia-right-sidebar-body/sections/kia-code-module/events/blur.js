
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(e){
		if(props.eTarget.closest('.style-rule')) this.inactiveStyleRule();
		if(props.eTarget.matches('.rule-value')) this.inactiveRuleValue();
	}

	static inactiveStyleRule(){
		const styleRuleEl = props.eTarget.closest('.style-rule');
		const rulePropEl = styleRuleEl.querySelector('.rule-prop')
		const ruleValueEl = styleRuleEl.querySelector('.rule-value');
		if(rulePropEl.innerText.trim() === '') {
			rulePropEl.innerText = '';
			ruleValueEl.innerText = '';
			styleRuleEl.classList.add('hidden');
		}
	}

	static inactiveRuleValue(){
		props.eTarget.removeAttribute('contenteditable');
	}
	
}

export default Index;