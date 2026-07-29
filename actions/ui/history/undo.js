
import flagAction from './flagAction/index.js';

function Index(){
	const items = KIA.state.history.getProp('items');
	let activeIndex = KIA.state.history.getProp('activeIndex');
	if(activeIndex >= items.length) {
		activeIndex = items.length-1;
		KIA.state.history.setActiveIndex(items.length-1);
	}
	if(activeIndex === -1 || activeIndex<0) {
		KIA.state.history.setActiveIndex(-1);
		return;
	}

	const item =  items[activeIndex];
	if(!item) return;
	flagAction[item.flag]?.(item, 'undo');
	KIA.state.history.undo();
}

export default Index;