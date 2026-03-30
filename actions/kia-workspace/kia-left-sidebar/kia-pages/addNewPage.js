

function Index(pageObject) {
    KIA.state.canvas.addNewPagesKey(pageObject.key);
    const pagesOrder = KIA.state.canvas.pagesOrder;
    KIA.services.idb.core.updateKeyValueObject('canvas', { pagesOrder })

    KIA.state.pages.addNewPage(pageObject);
    KIA.services.idb.core.addObject('pages', pageObject);
} 

export default Index;

