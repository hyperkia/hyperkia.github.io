
let debounceTimeout = null;

function Index(style){	
	KIA.state.canvas.setStyle(style);
	clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
    	const style = KIA.state.canvas.getProp('style');
        KIA.services.idb.core.updateKeyValueObject('canvas', {style});		
    }, 150);
}

export default Index;