
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(e){		
		if(props.eRTAction === 'addEffect') this.addEffect();
		if(props.eTAction === "effectEdit") this.editEffect();
		if(props.eTAction === "effectVisible") this.filterVisible();
		if(props.eTAction === "effectRemove") this.removeFilter();
	}

	static addEffect(){
		const layerKey = KIA.dom.read.getSelectionKey();
		const stackKey = crypto.randomUUID();
		const name = props.root.$id.effectOptions.value;
		const template = props.root.$id.effectItemTemplate.content.cloneNode(true);
		const effectItemEl = template.querySelector('.effect-item');
		effectItemEl.dataset.shadow = name;
		effectItemEl.dataset.stack = stackKey;
		props.root.$id.effectItems.append(template);
		const layerNewObj = {
			key: layerKey,
			stack: {
				[stackKey]: {
					key: stackKey,
					name,
					type: 'effect',
					status: true,
					value: '0px 4px 10px #00000040',
					trash: false,
				}
			}			
		};
		if(name === 'box-shadow') layerNewObj.stack[stackKey].value = '0px 4px 10px 0 #00000040';
		KIA.actions.share.setLayerSelectionStack(layerNewObj);
	}

	static editEffect(){
		const stackKey = props.eTarget.closest('[data-stack]').dataset.stack;
		KIA.kiaApp.dispatchEvent(new CustomEvent('editEffect', {
		  bubbles: true,
		  composed: true,
		  detail: { stackKey }
		})); 
	}

	static removeFilter(){
		const layerKey = KIA.dom.read.getSelectionKey();
		const stackKey = props.eTarget.closest('[data-stack]').dataset.stack;
		const effectItemEl = props.root._qs(`[data-stack="${stackKey}"]`);

		effectItemEl.classList.add('deleting');
        setTimeout(()=>{            
            effectItemEl.remove();
        },500);

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
		const stackKey = props.eTarget.closest('[data-stack]').dataset.stack;
		const visibleButtonEl = props.root._qs(`[data-stack="${stackKey}"] .effect-visibility`);
		const status = visibleButtonEl.dataset.effectVisible === 'true' ? false : true;;
		visibleButtonEl.dataset.effectVisible = status;
		
		const layerNewObj = {
			key: layerKey,
			stack: {
				[stackKey]: {
					key: stackKey,
        			status,
				}
			}        	
		};
        KIA.actions.share.setLayerSelectionStack(layerNewObj);
	}

}

export default Index;