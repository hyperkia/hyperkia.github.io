
let debounceTimeout = null;

function Index(cssObj){	
	KIA.state.canvas.setCss(cssObj);
	clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
    	const css = KIA.state.canvas.css;
        KIA.services.idb.core.updateKeyValueObject('canvas', {css});		
    }, 150);
}

export default Index;