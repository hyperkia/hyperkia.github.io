 
function Index() {
	const key = KIA.dom.read.getSelectionKey();
    KIA.state.pages.deleteSelectedPage();
    KIA.services.idb.core.deleteObject('pages', key);
    const pagesOrder = KIA.state.canvas.pagesOrder;
    const deleteIndex = pagesOrder.indexOf(key);
    if (deleteIndex !== -1) pagesOrder.splice(deleteIndex, 1);
    KIA.services.idb.core.updateKeyValueObject('canvas', {pagesOrder});
}

export default Index; 