
import propsHandler from '../propsHandler/index.js';

function Index(style) {
	const layerElement = KIA.dom.read.getSelectionLayerElement();
	const layerObj = KIA.dom.read.getSelectionLayerObject();

	const layerNewObj = {
		attributes: {},
		style: {},
		inputStyle: style,
		id: layerObj.id,
	};
	for(let p in style) {
		const propHandler = KIA.utils.string.underScoreToCamelCase(p);
		if(propsHandler[propHandler]) propsHandler[propHandler]('propsInputToSelection', layerNewObj);	
	}

	delete layerNewObj.inputStyle;


    KIA.actions.kiaLayers.setStyle(layerNewObj); 
    KIA.actions.kiaLayers.setAttributes(layerNewObj); 

	if( 
		layerNewObj.style.width || layerNewObj.style.height || 
		layerNewObj.style.left || layerNewObj.style.top || 
		layerNewObj.style.rotate || layerNewObj.style.rotate90
	) KIA.dom.kiaCanvas.createSelectionLayersOutline();
}

export default Index;