function Index() {
    const ids = KIA.state.canvas.getProp('children');
    const pages = KIA.state.pages.getProp('map');
    const fragments = document.createDocumentFragment();

    ids.forEach((id)=>{
        const pageEl = KIA.kiaLayers._qs(`[data-item="${id}"]`);
        if(pageEl) return;

        const p = KIA.nodesMap[id];           
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

}

export default Index;