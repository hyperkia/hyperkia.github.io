
const closestParents = [];

function getClosestActiveNode(id){
	closestParents.unshift(id);
	if(KIA.nodesMap[id].instanceof === 'document') return;
	return getClosestActiveNode(KIA.nodesMap[id].parent);
}

function createParents(){
	closestParents.forEach((id, i)=>{		
		const nodeEl = KIA.layersRefMap[id];
		if(nodeEl) {
			nodeEl.classList.add('show');
			return;
		}

		const nodeParentEl = KIA.layersRefMap[closestParents[i-1]];
		const l = KIA.nodesMap[id];
		const itemTemplate = KIA.kiaLayers.$id.nodeTemplate.content.cloneNode(true);
		const newNodeEl = itemTemplate.querySelector('.node');
		KIA.layersRefMap[l.id] = newNodeEl;
		const headerEl = itemTemplate.querySelector('.header');

		newNodeEl.classList.add('layer-node');
		newNodeEl.dataset.children = l.children.length;
		newNodeEl.dataset.item = l.id;
		newNodeEl.dataset.visibility = l.style.visibility || 'inherit';
		newNodeEl.dataset.lock = l.style['pointer-events'] || 'inherit';
		headerEl.dataset.title = l.title || l.nodeName;
		if(l.children.length > 0) newNodeEl.classList.add('show');
		nodeParentEl.querySelector('.childrens')?.appendChild(itemTemplate);
	});
}

function Index(){
	closestParents.length = 0;
	const id = KIA.state.ui.getSelectionId();
	KIA.nodesMap[id] && getClosestActiveNode(id);
	createParents();
}

export default Index;