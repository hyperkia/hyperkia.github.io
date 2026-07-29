import props from '../utils/props.js';
import methods from '../utils/methods.js';
import popoverBase from '../../popover-base.js';

class Index {

    static handler(e) {
        if(props.eTarget.closest('[data-id="cpicker-svbox"]')) this.cpickersvboxPointerUp(e);
        if(props.eTarget.matches('kia-color-picker-popover')) popoverBase.event(e);        
    }

    static cpickersvboxPointerUp(e){
        props.root.$id.cpickerSvbox.releasePointerCapture(e.pointerId);
        methods.updateSVBoxPointerUIByPointerEvent(e);
    }
    
}

export default Index;
