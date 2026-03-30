
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(){	
		if(props.eRTAction === 'addFilter') this.addFilter();
		if(props.eTAction === "filterVisible") this.filterVisible();
		if(props.eTAction === "filterRemove") this.removeFilter();
	}

	static addFilter(){
		const layerKey = KIA.dom.read.getSelectionKey();
		const name = props.root.$id.filterOptions.value;
		const rowEl = props.root.$id.filterItemsRow;
		const attrsString = (rowEl.dataset.activeFilters || '') + `--${name}`;
		rowEl.dataset.activeFilters = attrsString;
		const inputEl = props.root._qs(`[data-prop="filter-${name}"]`);
		rowEl.querySelector(`[data-filter-visible]`).dataset.filterVisible = true;
		const stackKey = crypto.randomUUID();
		const layerNewObj = {
			key: layerKey,
			stack: {				
				[stackKey]: {
					key: stackKey,
					name,
					type: 'filter',
					status: true,
					value: inputEl.dataset.default,
					trash: false,
				}
			}
		};
		
		KIA.actions.share.setLayerSelectionStack(layerNewObj);
		inputEl.dataset.stack = stackKey;
		inputEl.value = inputEl.dataset.default;
		inputEl.focus();
	}

	static removeFilter(){
		const layerKey = KIA.dom.read.getSelectionKey();
		const name = props.eTarget.closest('[data-filter]').dataset.filter;
		const inputEl = props.root._qs(`[data-prop="filter-${name}"]`);
		const rowEl = KIA.kiaCssFilter.$id.filterItemsRow;
		rowEl.dataset.activeFilters = rowEl.dataset.activeFilters.replace(`--${name}`,'');
		const stackKey = inputEl.dataset.stack;
		const layerNewObj = {
			key: layerKey,
			stack: {
				[stackKey]: {
					key: stackKey,
	        		trash: true,
				}
	        	
			}
		};
        KIA.actions.share.setLayerSelectionStack(layerNewObj); 
	}
 
	static filterVisible(){
		const layerKey = KIA.dom.read.getSelectionKey();
		const name = props.eTarget.closest('[data-filter]').dataset.filter;
		const inputEl = props.root._qs(`[data-prop="filter-${name}"]`);
		const status = props.eTarget.dataset.filterVisible === 'true' ? false : true;;
		const stackKey = inputEl.dataset.stack;
		const layerNewObj = {
        	key: layerKey,
        	stack: {
				[stackKey]: {
					key: stackKey,
	        		status,
				}
	        	
			}
		};
		props.eTarget.dataset.filterVisible = status;
        KIA.actions.share.setLayerSelectionStack(layerNewObj);
	}

}

export default Index;