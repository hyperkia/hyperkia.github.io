function Index() {
    const ids = KIA.state.canvas.getProp('children');
    const fragments = document.createDocumentFragment();

    ids.forEach((id)=>{
        const pageEl = KIA.kiaLayers._qs(`[data-item="${id}"]`);
        if(pageEl) return;

        const p = KIA.nodesMap[id];
        if(!p) return;
        const itemTemplate = KIA.kiaLayers.$id.nodeTemplate.content.cloneNode(true);
        const nodeEl = itemTemplate.querySelector('.node');
        const headerEl = nodeEl.querySelector('.header');

        nodeEl.classList.add('page-node')
        nodeEl.dataset.item = id;
        nodeEl.dataset.children = p.children.length;        
        headerEl.dataset.title = p.title;
        
        fragments.appendChild(itemTemplate);

        KIA.layersRefMap[id] = nodeEl;
    });


    KIA.kiaLayers.$id.layers.appendChild(fragments);

    ids.forEach(id => {
        const el = KIA.layersRefMap[id];
        if (el) KIA.kiaLayers.$id.layers.appendChild(el);
    });
}

export default Index;