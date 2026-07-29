
import props from '../utils/props.js';

class Index {
  
    static handler(e) {
        const iscomputedProp = e.target.dataset.computed;        
        const style = KIA.utils.dom.controlToCss(props.eTarget);
        if(iscomputedProp) KIA.managers.style.computedToSelectionProps(style);
        if(!iscomputedProp) KIA.managers.style.propsInputToSelection(style);
        e.target.blur();
    }

}

export default Index;