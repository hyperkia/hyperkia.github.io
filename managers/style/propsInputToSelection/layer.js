 
import propsHandler from '../propsHandler/index.js';
let debounceTimeout = null;
let historyItem = null;

function Index(style) {
	const layerObj = KIA.dom.read.getSelectionLayerObject();
	if(!historyItem) {			
	    historyItem = {
	    	flag: 'style',
	    	selectionId: layerObj.id,
	    	undo: {
	    		selectionStyle: structuredClone(layerObj.style),
	    		selectionAttributes: structuredClone(layerObj.attributes),
	    	}
	    };
	}


	const layerNewObj = {
		attributes: {},
		style: {},
		inputStyle: style,
		id: layerObj.id,
	};

	for(let p in style) {
		const propHandler = KIA.utils.string.underScoreToCamelCase(p);
		if(propsHandler[propHandler]) propsHandler[propHandler].inputTo(layerNewObj);	
	}

	delete layerNewObj.inputStyle;

    KIA.actions.kiaLayers.setStyle(layerNewObj); 
    KIA.actions.kiaLayers.setAttributes(layerNewObj);


    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
    	historyItem.redo = {    		
	        selectionStyle: structuredClone(layerNewObj.style),
	        selectionAttributes: structuredClone(layerNewObj.attributes),
    	}
        KIA.actions.ui.history.addItem(historyItem);
        historyItem = null;
    }, 200);

	if( 
		layerNewObj.style.width || layerNewObj.style.height || 
		layerNewObj.style.left || layerNewObj.style.top || 
		layerNewObj.style.rotate || layerNewObj.style.rotate90
	) {
		KIA.dom.kiaCanvas.selectionLayerResizeController();
	}
}

export default Index;