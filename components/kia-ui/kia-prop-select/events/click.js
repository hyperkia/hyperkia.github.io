import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {
  
    static handler() {            
       if(!props.eRootNode.$id.details.open) {          
            methods.setDropdownPosition(props.eRootNode);
       } else if(props.eTarget.closest('.select-option')) {
            methods.dropDownItemSelected();
       }
    }

}

export default Index;