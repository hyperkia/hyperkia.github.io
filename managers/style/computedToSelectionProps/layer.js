
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
	
	const newLayerObj = {
		attributes: {},
		style: {},
		computed: true,
		inputStyle: style,
		id: layerObj.id,
	};
	
	for(let p in style) {
		const propHandler = KIA.utils.string.underScoreToCamelCase(p);
		if(propsHandler[propHandler]) propsHandler[propHandler].computedTo(newLayerObj);	
	}

	delete newLayerObj.inputStyle;


    KIA.actions.kiaLayers.setStyle(newLayerObj); 
    KIA.actions.kiaLayers.setAttributes(newLayerObj);

    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        historyItem.redo = {    		
	        selectionStyle: structuredClone(newLayerObj.style),
	        selectionAttributes: structuredClone(newLayerObj.attributes),
    	}
        KIA.actions.ui.history.addItem(historyItem);
        historyItem = null;
    }, 200);

	if( 
		newLayerObj.style.width || newLayerObj.style.height || 
		newLayerObj.style.left || newLayerObj.style.top || 
		newLayerObj.style.rotate || newLayerObj.style.rotate90
	) {
		KIA.dom.kiaCanvas.selectionLayerResizeController();
		KIA.dom.kiaCanvas.createSelectionLayersOutline();
	}
}

export default Index;