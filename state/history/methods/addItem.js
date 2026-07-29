import props from '../props.js';

const MERGE_TIME = 300;

function Index(item) {
    if (props.activeIndex < props.items.length - 1) {
        props.items.splice(props.activeIndex + 1);
    }

    item.createdAt = Date.now();

    const isItemPrevConnected = isPrevItemConnected(item);
    if (isItemPrevConnected) {
        props.items[props.items.length - 1] = item;
    } else {
        props.items.push(item);
        props.activeIndex++;
    }

    if (props.items.length > props.MAX_HISTORY) {
        const overflow = props.items.length - props.MAX_HISTORY;

        props.items.splice(0, overflow);
        props.activeIndex = Math.max(0, props.activeIndex - overflow);
    }

    if (props.items.length === 0) props.activeIndex = -1;
}

function isPrevItemConnected(newItem) {
    const prevItem = props.items.at(-1);
    if (!prevItem) return false;

    return (
        prevItem.flag === newItem.flag &&
        newItem.createdAt - prevItem.createdAt <= MERGE_TIME
    );
}

export default Index;