 
function Index(id){
    if(KIA.dom.read.getObjectStoreNameById(id) !== 'pages') return;
    const pageObj = KIA.nodesMap[id];
	let visibility = pageObj.style.visibility || 'inherit';
	visibility = visibility === 'inherit' ? 'hidden' : 'inherit';

	const newPageObj = {
        id,
        style: {
            visibility,
        }
    };
	
	KIA.state.ui.setDirtyMap({
        page: {
            id,
            style: Object.keys(newPageObj.style),
            flag: 'style',
            flagType: 'lockVisibility',
        }
    });

    KIA.state.pages.setStyle(newPageObj);
    KIA.state.ui.resetDirtyMap();

    KIA.services.idb.core.replaceObjectByKey('pages', pageObj);

    KIA.actions.share.resetSelectionId();
}

export default Index;