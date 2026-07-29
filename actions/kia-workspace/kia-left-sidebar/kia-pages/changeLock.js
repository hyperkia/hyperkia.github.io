
function Index(id){
    if(KIA.dom.read.getObjectStoreNameById(id) !== 'pages') return;
    const pageObj = KIA.nodesMap[id];
	let pointerEvents = pageObj.style['pointer-events'] || 'inherit';
	pointerEvents = pointerEvents === 'none' ? 'inherit' : 'none';

	const newPageObj = {
        id,
        style: {
            'pointer-events': pointerEvents
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