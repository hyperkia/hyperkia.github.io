
import props from '../props.js';

function Index(id) {
    const index = props.escapeStack.findIndex(i => i.id === id);
    if (index !== -1) {
        props.escapeStack.splice(index, 1);
    }
}

export default Index;