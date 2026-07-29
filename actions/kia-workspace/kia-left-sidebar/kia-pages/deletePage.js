
function Index(id) {
    if(KIA.dom.read.getObjectStoreNameById(id) !== 'pages') return;
    
    const pageObj = KIA.nodesMap[id];
    const deletePageLayersIds = KIA.dom.read.getLayerTreeChildrensById(id);

    const deletePageLayersObj = {};
    deletePageLayersIds.forEach(id => deletePageLayersObj[id]=structuredClone(KIA.nodesMap[id]));
    const historyItem = {
        flag: 'deletePage',
        selectionId: id,
        selectionObj: structuredClone(pageObj),
        undo: {
            restorePageLayersObj: deletePageLayersObj,
            canvasChildren: structuredClone(KIA.state.canvas.getProp('children')),
        },
        redo: {
            deletePageLayersIds,
        }
    };

    KIA.state.ui.setDirtyMap({
        page: {
        	id,
        	flag: 'deletePage',
        }
    });

    const delLayersId = [];
    deletePageLayersIds.forEach((id)=>{
        const obj = KIA.nodesMap[id];
        if(obj?.tagName) delLayersId.push(id);
    })
    
    KIA.state.canvas.deletePagesIdAsChildren(id);
    KIA.state.layers.deletePageLayers(id);
    KIA.state.pages.deletePage(id);

    const canvasChildren = KIA.state.canvas.getProp('children');
    KIA.services.idb.core.updateKeyValueObject('canvas', { children: canvasChildren });
    KIA.services.idb.core.deleteObjects('layers', delLayersId);
    KIA.services.idb.core.deleteObjects('pages', id);

    historyItem.redo.canvasChildren = canvasChildren;
    KIA.actions.ui.history.addItem(historyItem);
    
    KIA.state.ui.resetDirtyMap();
    KIA.actions.share.resetSelectionId();
}

export default Index; 