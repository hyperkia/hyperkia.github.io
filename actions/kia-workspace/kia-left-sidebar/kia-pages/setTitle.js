 
function Index(newPageObj) {
    KIA.state.pages.setTitle(newPageObj);
    const pageObj = KIA.nodesMap[newPageObj.id];
    KIA.services.idb.core.replaceObjectByKey('pages', pageObj);
    
}

export default Index; 