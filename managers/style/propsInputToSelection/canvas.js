
let debounceTimeout = null;
let historyItem = null;

function Index(style) {
    const canvasStyle = KIA.state.canvas.getProp('style');
    if(!historyItem) {        
        historyItem = {
            flag: 'style',
            selectionId: 'canvas',
            undo: {
                selectionStyle: structuredClone(canvasStyle),
            }
        };
    }
	KIA.actions.kiaCanvas.setCanvasCss(style);
	
	clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        historyItem.redo = {            
            selectionStyle: structuredClone(style),
        }
        KIA.actions.ui.history.addItem(historyItem);
        historyItem = null;
    }, 200);
}

export default Index;



