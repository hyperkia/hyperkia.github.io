
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {
  
    static handler(e) {
        props.eTarget.releasePointerCapture(e.pointerId);
        props.scrubber = {};
    } 

}

export default Index;