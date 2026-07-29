
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {
  
    static handler(e) {        
        if (!props.eTarget || !props.eTarget.hasPointerCapture(e.pointerId)) return false;
        if(!props.scrubber.active) return;
        if(!props.root) return;
        const inputEl = props.root.$id.input;
        if(inputEl.type !== 'number') return;

        props.scrubber.mX = e.clientX;

        const calcX = props.scrubber.mX - props.scrubber.dX;
        const value = +(props.scrubber.value) + calcX;
        if(value > +inputEl.max) return;
        inputEl.value = value<0 ? 0 : value;

        inputEl.dispatchEvent(new Event("input", {
          bubbles: true,
          cancelable: true
        }));
    } 

}

export default Index;