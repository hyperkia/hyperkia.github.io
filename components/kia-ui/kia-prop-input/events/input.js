
class Index {
  
    static handler(e) {        
        const style = KIA.utils.dom.controlToCss(e.target);
        KIA.managers.style.propsInputToSelection(style);
    } 

}

export default Index;