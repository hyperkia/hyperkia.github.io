
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

    static handler(e){
        if(props.eTarget.matches('[data-prop]')) this.inputFormStyleRule();
        if(e.target.closest('.style-rule')) this.inputStyleRule();
    }

    static inputFormStyleRule(){
        const style = {};
        const inputEl = props.eTarget;
        style[inputEl.dataset.prop] = parseInt(inputEl.value)+inputEl.dataset.unit;            
        KIA.managers.style.styleCodeToSelection(style);
    }

    static inputStyleRule() {
        const style = {};
        const styleRuleEl = props.eTarget.closest('.style-rule');
        const cssText = styleRuleEl.textContent;
        const parseStyle = KIA.utils.css.parseCss(cssText);
        if(Object.keys(parseStyle).length === 0) return;
        KIA.managers.style.styleCodeToSelection(parseStyle);
    }

}

export default Index;