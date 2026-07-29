import props from '../props.js';

function Index(item) {
    if (typeof item.close !== 'function') {
        console.warn('Invalid escape item', item);
        return;
    }

    // prevent duplicate
    KIA.state.ui.removeEscape(item.id);

    props.escapeStack.push(item)
}

export default Index;