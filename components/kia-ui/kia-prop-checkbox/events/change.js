
class Index {
  
    static handler(e) {        
        const prop = e.target.dataset.prop;
        KIA.managers.style.propsInputToSelection({[prop]: e.target.checked});
    } 

}

export default Index;