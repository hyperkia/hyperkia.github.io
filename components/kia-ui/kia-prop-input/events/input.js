
class Index {
  
    static handler(e) {
        const inputEl = e.target;        
        const iscomputedProp = inputEl.dataset.computed;        
        const style = KIA.utils.dom.controlToCss(inputEl);
        if(iscomputedProp) KIA.managers.style.computedToSelectionProps(style);
        if(!iscomputedProp) KIA.managers.style.propsInputToSelection(style);
    } 

}

export default Index;