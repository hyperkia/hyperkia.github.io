
let debounceTimeout = null;
let historyItem = null;

function Index(style) {
	const pageObj = KIA.dom.read.getSelectionPageObject();
    if(!historyItem) {        
        historyItem = {
            flag: 'style',
            selectionId: pageObj.id,
            undo: {
                selectionStyle: structuredClone(pageObj.style),
            }
        };
    }
    
	const newPageObj = {
		id: pageObj.id,
		style,
	};
    KIA.actions.kiaPages.setStyle(newPageObj);

    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        historyItem.redo = {            
            selectionStyle: structuredClone(newPageObj.style),
        }
        KIA.actions.ui.history.addItem(historyItem);
        historyItem = null;
    }, 200);
}

export default Index;