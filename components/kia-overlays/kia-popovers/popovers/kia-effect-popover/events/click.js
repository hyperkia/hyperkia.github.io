import props from '../utils/props.js';
import methods from '../utils/methods.js';
import popoverBase from '../../popover-base.js';

class Index {
  
    static handler(e) {
       if(props.eTarget.getRootNode().host.dataset.event === 'closePopover') props.root.close();
       if(props.eRTarget.matches('.effect-field-color') && props.eTarget.closest('.label')) this.openColorPicker();
    }

    static openColorPicker(){
      KIA.actions.share.openColorPicker({type: 'effect'});
    }
} 

export default Index;