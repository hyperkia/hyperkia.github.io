import props from '../utils/props.js';
import methods from '../utils/methods.js';
import popoverBase from '../../popover-base.js';

class Index {
    static handler(e) {
        if (props.eTarget.closest('[data-id="cpicker-svbox"]')) this.cpickersvboxPointerDown(e);
        if(props.eTarget.matches('.popover-header')) popoverBase.event(e);
    }

    static cpickersvboxPointerDown(e) {
        props.root.$id.cpickerSvbox.setPointerCapture(e.pointerId);
        methods.updateSVBoxPointerUIByPointerEvent(e);       
    }

}

export default Index;