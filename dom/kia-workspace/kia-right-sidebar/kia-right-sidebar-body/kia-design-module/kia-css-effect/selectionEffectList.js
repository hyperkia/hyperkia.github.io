function Index() {
	const layerObj = KIA.dom.read.getSelectionLayerObject();
	if(!layerObj) return;
	
	let attrsString = '';

	[...KIA.kiaCssEffect.$id.effectItems.children].forEach((ei)=> ei.classList.add('hidden'));

	let usedItem = 0;

	for(let [k,s] of Object.entries(layerObj.stack)) {
		if(s.type === 'effect') {
			if(s.trash === true) continue; 

			let effectItem = KIA.kiaCssEffect.$id.effectItems.children[usedItem];
			if(effectItem) effectItem.classList.remove('hidden');
			if(!effectItem) {
				const fragement = KIA.kiaCssEffect.$id.effectItemTemplate.content.cloneNode(true);
				KIA.kiaCssEffect.$id.effectItems.append(fragement);	
				effectItem = KIA.kiaCssEffect.$id.effectItems.children[usedItem];
			}			
			effectItem.dataset.shadow = s.name;
			effectItem.dataset.stack = s.key;
			const visibilityButtonEl = effectItem.querySelector('.effect-visibility');
			visibilityButtonEl.dataset.shadow = s.status;
			usedItem++;
		}
	}
}

export default Index;	