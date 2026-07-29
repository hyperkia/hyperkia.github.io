
function removeDeletedChildren(nodeEl, nodeObj){
	const childrensIds = nodeObj.children || [];
	const childrensEl = nodeEl.querySelector(':scope > .childrens');
	if (!childrensEl) return;
	[...childrensEl.children].forEach((c)=>{
		const cId = c.dataset.item;
		if(!childrensIds.includes(cId)) {
			c.remove();
			KIA.layersRefMap[cId] = null;
			delete KIA.layersRefMap[cId];
		}		
	})	
}

function showChildren(nodeEl, nodeObj){
	if (!nodeEl.classList.contains('show')) return;	
	const childrensId = nodeObj.children ?? [];
	if(childrensId.length === 0) return;
	const childrensEl = nodeEl.querySelector(':scope > .childrens');
	if (!childrensEl) return;
	childrensId.forEach((cId, i)=>{
		if(KIA.layersRefMap[cId]) return;

		const l = KIA.nodesMap[cId];
		if(!l) return;
		const itemTemplate = KIA.kiaLayers.$id.nodeTemplate.content.cloneNode(true);
		const newNodeEl = itemTemplate.querySelector('.node');
		const headerEl = itemTemplate.querySelector('.header');

		newNodeEl.classList.add('layer-node');
		newNodeEl.dataset.children = l.children.length;
		newNodeEl.dataset.item = l.id;
		newNodeEl.dataset.visibility = l.style.visibility || 'inherit';
		newNodeEl.dataset.lock = l.style['pointer-events'] || 'inherit';
		headerEl.dataset.title = l.title || l.tagName;

		KIA.layersRefMap[l.id] = newNodeEl;

		childrensEl.appendChild(itemTemplate);
	});

	childrensId.forEach(id => {
        const el = KIA.layersRefMap[id];
        if (el) childrensEl.appendChild(el);
    });
}

function Index(){	
	const nodeEls = KIA.kiaLayers._qsAll('.node');	

	nodeEls.forEach((nodeEl)=>{
		if(nodeEl.offsetWidth === 0) return;
		const id = nodeEl.dataset.item;
		const nodeObj = KIA.nodesMap[id];

		removeDeletedChildren(nodeEl, nodeObj);
		showChildren(nodeEl, nodeObj);
	});
}

export default Index;