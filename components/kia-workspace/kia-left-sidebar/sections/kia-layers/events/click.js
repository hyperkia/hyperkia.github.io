
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(e){		
		if(props.eTarget.closest('.show-children-btn')) this.renderChildrens();
		if(props.eTarget.closest('.item-visible')) this.changeLayerVisiblility();
		if(props.eTarget.closest('.item-lock')) this.changeLayerPointerLock();
		if(props.eTarget.closest('.node')) this.setSelectionKey();
	}

	static renderChildrens(){
		const nodeEl = props.eTarget.closest('.node');
		nodeEl.classList.toggle('show');
		KIA.dom.kiaLayers.updateLayersPanel();
	}

	static setSelectionKey(){
		const oldSelectionId = KIA.state.ui.getSelectionId();
		const nodeEl = props.eTarget.closest('.node');		
		const newSelectionId = nodeEl.dataset.item;
        if(oldSelectionId === newSelectionId) return;
		const ids = new Set().add(newSelectionId);
        KIA.actions.share.setSelectionIds(ids);
 		KIA.dom.kiaLayers.activeSelectionInUI();
	}

	static changeLayerVisiblility(){
		const nodeEl = props.eTarget.closest('.node');
		const id = nodeEl.dataset.item;
		KIA.actions.kiaLayers.changeVisibility(id);
		const layerVisibility = KIA.nodesMap[id].style.visibility;
		nodeEl.dataset.visibility = layerVisibility;		
	}

	static changeLayerPointerLock(){
		const nodeEl = props.eTarget.closest('.node');
		const id = nodeEl.dataset.item;
		KIA.actions.kiaLayers.changeLock(id);
		const layerLock = KIA.nodesMap[id].style['pointer-events'];
		nodeEl.dataset.lock = layerLock;		
	}

}

export default Index;




	