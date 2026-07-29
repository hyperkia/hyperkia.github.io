
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(){	
		if(props.eRTAction === 'addFilter') this.addFilter();
		if(props.eTAction === "filterVisible") this.filterVisible();
		if(props.eTAction === "filterRemove") this.removeFilter();
	}

	static addFilter(){
		const layerId = KIA.state.ui.getSelectionId();
		const name = props.root.$id.filterOptions.value;
		const rowEl = props.root.$id.filterItemsRow;
		const attrsString = (rowEl.dataset.activeFilters || '') + `--${name}`;
		rowEl.dataset.activeFilters = attrsString;
		const inputEl = props.root._qs(`[data-prop="filter-${name}"]`);		
		rowEl.querySelector(`[data-filter-visible]`).dataset.filterVisible = true;
		const stackId = crypto.randomUUID();
		const newLayerObj = {
			id: layerId,
			newStack: {
				id: stackId,
				name,
				type: 'filter',
				enable: true,
				value: {
					amount: inputEl.dataset.default,
					unit: inputEl.dataset.unit,
				}
			}
		};

		KIA.actions.kiaLayers.addStack(newLayerObj);
		inputEl.dataset.stack = stackId;
		inputEl.value = inputEl.dataset.default;
		inputEl.focus();
		methods.setNonActiveFilterAsDefault();
	}

	static removeFilter(){
		const layerId = KIA.state.ui.getSelectionId();
		const name = props.eTarget.closest('[data-filter]').dataset.filter;
		const inputEl = props.root._qs(`[data-prop="filter-${name}"]`);
		const rowEl = KIA.kiaCssFilter.$id.filterItemsRow;
		rowEl.dataset.activeFilters = rowEl.dataset.activeFilters.replace(`--${name}`,'');
		const stackId = inputEl.dataset.stack;

		const newLayerObj = {
			id: layerId,
			stackId,
		};

        KIA.actions.kiaLayers.removeStack(newLayerObj);
        methods.setNonActiveFilterAsDefault();
	}
 
	static filterVisible(){
		const layerId = KIA.state.ui.getSelectionId();
		const name = props.eTarget.closest('[data-filter]').dataset.filter;
		const inputEl = props.root._qs(`[data-prop="filter-${name}"]`);
		const enable = props.eTarget.dataset.filterVisible === 'true' ? false : true;;
		const stackId = inputEl.dataset.stack;
		const newLayerObj = {
        	id: layerId,
        	updateStack: {
				id: stackId,
	        	enable,	        	
			}
		};
		props.eTarget.dataset.filterVisible = enable;
        KIA.actions.kiaLayers.updateStack(newLayerObj);
	}

}

export default Index;