
import props from '../props.js';

function Index() {
    const item = props.escapeStack.pop();
    if (!item) return;

    item.close();
}

export default Index;