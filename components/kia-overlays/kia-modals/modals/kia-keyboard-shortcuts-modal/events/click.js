import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

    static handler(e) {
        if (props.eRTAction === 'closeModal') props.root.close();
    }
}

export default Index;