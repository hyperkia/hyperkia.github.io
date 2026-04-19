
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(e){
		if(props.eTarget.closest('.node')) this.setSelectionKey();
		if(props.eTarget.closest('.show-children-btn')) this.renderChildrens();
		if(props.eTarget.closest('.item-visible')) this.changeLayerVisiblility();
		if(props.eTarget.closest('.item-lock')) this.changePagePointerLock();
	}

	static renderChildrens(){
		const nodeEl = props.eTarget.closest('.node');
		nodeEl.classList.toggle('show');
		KIA.dom.kiaLayers.updateLayersPanel();
	}

	static setSelectionKey(){
		const nodeEl = props.eTarget.closest('.node');		
		const id = nodeEl.dataset.item;
		const ids = new Set().add(id);
        KIA.actions.share.setSelectionKeys(ids, {source: props.root});
        methods.activeSelection();
	}

	static changeLayerVisiblility(){
		const nodeEl = props.eTarget.closest('.node');
		const id = nodeEl.dataset.item;
		const layerObj = KIA.state.layers.getProp('map')[id];
		let visibility = layerObj.style.visibility || 'inherit';
		visibility = visibility === 'inherit' ? 'hidden' : 'inherit';		
		KIA.managers.style.propsInputToSelection({visibility});		
		nodeEl.dataset.visibility = visibility;
		const ids = new Set().add('canvas');
        KIA.actions.share.setSelectionKeys(ids, {source: props.root});
	}

	static changePagePointerLock(){
		const nodeEl = props.eTarget.closest('.node');
		const id = nodeEl.dataset.item;
		const layerObj = KIA.state.layers.getProp('map')[id];
		let pointerEvents = layerObj.style['pointer-events'] || 'inherit';
		pointerEvents = pointerEvents === 'none' ? 'inherit' : 'none';
		KIA.managers.style.propsInputToSelection({'pointer-events': pointerEvents});		
		nodeEl.dataset.lock = pointerEvents;
		const ids = new Set().add('canvas');
        KIA.actions.share.setSelectionKeys(ids, {source: props.root});
	}

}

export default Index;




	