
let debounceTimeout = null;

function Index(newPageObj){
    KIA.state.pages.setStyle(newPageObj);
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        const pageObj = KIA.dom.read.getSelectionPageObject();
		KIA.services.idb.core.replaceObjectByKey('pages', pageObj);    	
    }, 150);
}

export default Index;