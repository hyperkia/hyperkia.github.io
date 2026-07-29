
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(e){
		
		const isMove = KIA.utils.pointer.isBeyondTolerance(props.pointer.dX, props.pointer.dY, props.pointer.mX, props.pointer.mY, 5);
		if(isMove) return;

		if(props.eRTarget.matches('.copy-style-rules')) this.styleRulesToClipBoard();
		if(props.eTarget.matches('.style-rules')) methods.createNewRule(props.eTarget);
		if(props.eTarget.matches('.rule-value') || props.eTarget.matches('.rule-prop')) this.editRuleValue();	
		if(props.eRTAction === 'addNewRule') this.addNewRule();
	}

	static async styleRulesToClipBoard(){
		props.eRTarget.classList.add('copied');
        const styleRulesEl = props.eRTarget.closest('.design-module')?.querySelector('.style-rules');
        const cssObject = methods.collectStyleRules(styleRulesEl);
        const css = KIA.utils.css.objectToCss(cssObject);
        const formatCss = css.replaceAll(';', ';\n');
        await navigator.clipboard.writeText(formatCss)
        setTimeout(()=>{
        	props.root._qs('.copied')?.classList.remove('copied');
        }, 2000);
    }

    static editRuleValue(){
    	props.eTarget.setAttribute('contenteditable', true);
		props.eTarget.focus();
    }

    static addNewRule(){
    	let isAnyFreeRule = null;
    	const existingNewRules = props.root.$id.AdvancedRules.querySelectorAll('.new-rule');
    	existingNewRules.forEach((enr)=>{
    		const ruleProp = enr.querySelector('.rule-prop').textContent.trim();
    		const ruleValue = enr.querySelector('.rule-value').textContent.trim();
    		if(!ruleProp && !ruleValue) isAnyFreeRule = enr;
    	})

    	if(isAnyFreeRule) {
    		isAnyFreeRule.classList.remove('hidden');
    		isAnyFreeRule.querySelector('.rule-prop').focus();
    		return;
    	}

    	methods.createNewRule(props.root.$id.AdvancedRules);
    }
	
}

export default Index;
