
let debounceTimeout = null;

function Index(newPageObj){
    if(Object.keys(newPageObj.style).length === 0) return;
    KIA.state.ui.setDirtyMap({
        page: {
            id: newPageObj.id,
            style: Object.keys(newPageObj.style),
            flag: 'style',
        }
    });
    KIA.state.pages.setStyle(newPageObj);
    KIA.state.ui.resetDirtyMap();
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        const pageObj = KIA.nodesMap[newPageObj.id];
        KIA.services.idb.core.replaceObjectByKey('pages', pageObj);       
    }, 150);
}

export default Index;