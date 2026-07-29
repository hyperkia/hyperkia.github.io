
import props from './props.js';

const Index = {
	setNonActiveFilterAsDefault(){
		let firstInActive = undefined;
		for(const item of props.root.$class.filterItemColumn) {
			if(firstInActive) break;
			if(item.offsetWidth === 0) firstInActive = item.dataset.filter;
		}

		if(!firstInActive) {
			props.root.$id.filterItemsRow.dataset.remainingFilter = 'no';
		} else {
			props.root.$id.filterItemsRow.dataset.remainingFilter = 'yes';
		}

		props.root.$id.filterOptions.value = firstInActive || 'blur';
	},
};

export default Index;