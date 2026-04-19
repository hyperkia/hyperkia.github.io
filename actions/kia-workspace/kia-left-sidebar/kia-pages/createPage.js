
function Index(pageObject) {
    KIA.state.canvas.addNewPagesId(pageObject.id);
    const canvasChildren = KIA.state.canvas.getProp('children');
    KIA.services.idb.core.updateKeyValueObject('canvas', { children: canvasChildren })

    KIA.state.pages.createPage(pageObject);
    KIA.services.idb.core.addObject('pages', pageObject);
} 

export default Index;

