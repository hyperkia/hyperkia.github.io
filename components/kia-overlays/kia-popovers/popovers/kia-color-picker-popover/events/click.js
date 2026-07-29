import props from '../utils/props.js';
import methods from '../utils/methods.js';
import popoverBase from '../../popover-base.js';

class Index {
  
    static handler(e) {
       if(props.eTarget.getRootNode().host.dataset.event === 'closePopover') props.root.close();
    } 
} 

export default Index;