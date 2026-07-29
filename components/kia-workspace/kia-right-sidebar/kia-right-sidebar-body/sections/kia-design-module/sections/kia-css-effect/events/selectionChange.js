
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static effectUiItems = ['text-shadow', 'box-shadow', 'drop-shadow'];

	static handler(e){
		this.selectionEffectToUi();
	}

	static selectionEffectToUi(){
		const layerObj = KIA.dom.read.getSelectionLayerObject();
		if(!layerObj) return;

		[...KIA.kiaCssEffect.$id.effectItems.children].forEach((ei)=> ei.classList.add('hidden'));

		let usedItem = 0;

		layerObj.stack.forEach?.((s)=>{
			if(this.effectUiItems.includes(s.name)) {
				let effectItem = KIA.kiaCssEffect.$id.effectItems.children[usedItem];
				if(effectItem) effectItem.classList.remove('hidden');
				if(!effectItem) {
					const fragement = KIA.kiaCssEffect.$id.effectItemTemplate.content.cloneNode(true);
					KIA.kiaCssEffect.$id.effectItems.append(fragement);	
					effectItem = KIA.kiaCssEffect.$id.effectItems.children[usedItem];
				}			
				effectItem.dataset.shadow = s.name;
				effectItem.dataset.stack = s.id;
				const visibilityButtonEl = effectItem.querySelector('.effect-visibility');
				visibilityButtonEl.dataset.effectVisible = s.enable;
				usedItem++;
			}
		});

	}

	
	
}

export default Index;