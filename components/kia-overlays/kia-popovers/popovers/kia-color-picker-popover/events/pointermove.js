import props from '../utils/props.js';
import methods from '../utils/methods.js';
import popoverBase from '../../popover-base.js';

class Index {
    static handler(e) {
        if (props.eTarget.closest('[data-id="cpicker-svbox"]')) this.cpickersvboxPointerMove(e);
        if(props.eTarget.matches('kia-color-picker-popover')) popoverBase.event(e);
    }             

    static cpickersvboxPointerMove(e) {
        if (!props.root.$id.cpickerSvbox.hasPointerCapture(e.pointerId)) return;
        methods.updateSVBoxPointerUIByPointerEvent(e);
    }
}

export default Index;

