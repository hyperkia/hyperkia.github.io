
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

    static handler(e){
        const inputEl = props.eTarget;
        const key = e.code.toLowerCase();
        if (key === 'enter' && inputEl.tagName === 'INPUT' || key === 'escape') {
            e.preventDefault();
            inputEl.blur();
        }
    }

}

export default Index;