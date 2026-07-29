 
import flagAction from './flagAction/index.js';

function Index(){
	KIA.state.history.redo();
	let activeIndex = KIA.state.history.getProp('activeIndex');
	const items =  KIA.state.history.getProp('items');
	if(activeIndex > items.length-1) {
		KIA.state.history.setActiveIndex(items.length);
		return;
	}
	
	const item =  items[activeIndex];
	if(!item) return;
	flagAction[item.flag]?.(item, 'redo');
}

export default Index;