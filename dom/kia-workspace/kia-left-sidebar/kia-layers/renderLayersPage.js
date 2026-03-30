function Index() {
    
    const pagesKey = KIA.state.canvas.pagesOrder;
    const pages = KIA.state.pages.map;
    const pageFragment = document.createDocumentFragment();
    pagesKey.forEach((k)=>{
        const p = pages[k];
        if(!p) return;
        const itemTemplate = KIA.kiaLayers.$id.pageItemTemplate.content.cloneNode(true);
        const pageItem = itemTemplate.querySelector('.page-item');
        const pageName = itemTemplate.querySelector('.page-name');

        pageItem.dataset.page = k;        
        pageName.innerText = p.name;

        pageFragment.appendChild(itemTemplate);
    })    
    KIA.kiaLayers.$id.layers.append(pageFragment);

}

export default Index;