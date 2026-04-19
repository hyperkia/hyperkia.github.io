
class Index {
  
    static handler(e) {        
        const css = KIA.utils.dom.controlToCss(e.target);
        KIA.managers.style.propsInputToSelection(css);
    } 

}

export default Index;