 
function Index(newPageObj) {
    KIA.state.ui.setDirtyMap({
        page: {
            id: newPageObj.id,
            flag: 'title',
        }
    });
    KIA.state.pages.setTitle(newPageObj);
    KIA.state.ui.resetDirtyMap();
    const pageObj = KIA.nodesMap[newPageObj.id];
    KIA.services.idb.core.replaceObjectByKey('pages', pageObj);
    
}

export default Index; 
