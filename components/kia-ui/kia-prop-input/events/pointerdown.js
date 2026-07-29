
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {  
    static handler(e) {        
        if(props.eTarget.closest('label.label')) this.scrubberingActive(e);
    } 

    static scrubberingActive(e){        
        props.eTarget.setPointerCapture(e.pointerId);
        const inputEl = props.root.$id.input;
        if(inputEl.type !== 'number') return;
        props.scrubber = {
            active: true,
            dX: e.clientX,
            value: +(inputEl.value) || 0,
        };
    }
}

export default Index;