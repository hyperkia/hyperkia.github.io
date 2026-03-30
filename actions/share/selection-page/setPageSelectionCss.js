
let debounceTimeout = null;

function Index(pageNewObj){
    const pageObj = KIA.dom.read.getSelectionPageObject();
    KIA.state.pages.setSelectionCss(pageNewObj);
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
		KIA.services.idb.core.replaceObjectByKey('pages', pageObj);    	
    }, 150);
}

export default Index;