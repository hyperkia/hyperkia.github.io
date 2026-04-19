
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(e){
		this.selectionFilterToUi();
	}

	static selectionFilterToUi(){
		const layerObj = KIA.dom.read.getSelectionLayerObject();
		if(!layerObj) return;
		const filterTypes = KIA.state.config.getProp('filterTypes');
		
		let attrsString = '';
		layerObj.stack.forEach?.((s)=>{
			if(filterTypes.includes(s.type)) {
				attrsString += `--${s.type}`;
				const inputEl = KIA.kiaCssFilter._qs(`[data-prop="filter-${s.type}"]`);
				inputEl.value = parseInt(s.value.amount);
				inputEl.dataset.stack = s.id;
				KIA.kiaCssFilter._qs(`[data-filter="${s.type}"] .filter-visible`).dataset.filterVisible = s.enable;
			}
		});

		KIA.kiaCssFilter.$id.filterItemsRow.dataset.activeFilters = attrsString;
		methods.setNonActiveFilterAsDefault();
	}
	
}

export default Index;