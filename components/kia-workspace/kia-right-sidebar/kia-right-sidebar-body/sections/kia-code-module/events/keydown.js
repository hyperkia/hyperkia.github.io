
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

    static handler(e){
        const editableEl = props.eTarget.closest('.rule-prop') || props.eTarget.closest('.rule-value');            
        if(!editableEl) return;
        const key = e.code.toLowerCase();
        if (key === 'enter' || key === 'escape') {
            e.preventDefault();
            editableEl.blur();
        }

        if(key === 'enter') this.isNewRuleNeeded();
    }

    static isNewRuleNeeded(){
        const styleRulesEl = props.eTarget.closest('.style-rules');
        if(props.eTarget.matches('.rule-prop')) {
            const styleRuleEl = props.eTarget.closest('.style-rule');
            styleRuleEl.querySelector('.rule-value').focus();
        }
        if(props.eTarget.matches('.rule-value')) methods.createNewRule(styleRulesEl);
    }


    

}

export default Index;