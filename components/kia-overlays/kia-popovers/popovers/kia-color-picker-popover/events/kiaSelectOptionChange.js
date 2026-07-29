
import props from '../utils/props.js';

class Change {
	static handler(){
		if(props.eTarget.dataset.name === 'cpicker-codeswitch') this.codeswitch();
	}

	static codeswitch(e) {
        const value = props.root.$id.cpickerCodeswitch.value;
        const codeBlockEl = props.root._qs(`.cpicker-inputs-${value}`);
        [...props.root.$id.cpickerInputsWrapper.children].forEach((el) => {
            el.classList.remove('show');
        })
        codeBlockEl.classList.add('show');
        props.root.$id.cpickerInputAlpha.classList.add('show');
    }
}

export default Change;