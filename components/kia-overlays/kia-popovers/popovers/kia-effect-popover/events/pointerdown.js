import props from '../utils/props.js';
import methods from '../utils/methods.js';
import popoverBase from '../../popover-base.js';

class Index {
    static handler(e) {        
        if(props.eTarget.matches('.popover-header')) popoverBase.event(e);
    }

    

}

export default Index;