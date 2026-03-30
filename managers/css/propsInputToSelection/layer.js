
import propsHandler from '../propsHandler/index.js';

function Index(css) {

	const layerElement = KIA.dom.read.getSelectionLayerElement();
	const layerObj = KIA.dom.read.getSelectionLayerObject();

	const layerNewObj = {
		attrs: {},
		css: {},
		sattrs: {},
		scss: {},
		inputCss: css,
		key: layerObj.key,
	};
	for(let p in css) {
		const propHandler = KIA.utils.string.underScoreToCamelCase(p);
		if(propsHandler[propHandler]) propsHandler[propHandler]('propsInputToSelection', layerNewObj);	
	}

	delete layerNewObj.inputCss;

    KIA.actions.share.setLayerSelectionCss(layerNewObj);
    KIA.actions.share.setLayerSelectionSCss(layerNewObj); 

	if(layerObj.rawSvgInnerHTML && layerObj.nodeName === 'svg') layerNewObj.rawSvgInnerHTML = layerElement.innerHTML;
    KIA.actions.share.setLayerSelectionStringProperties(layerNewObj); 

	if(layerNewObj.css.width || layerNewObj.css.height || layerNewObj.css.left || layerNewObj.css.top || layerNewObj.css.rotate || layerNewObj.css.rotate90) KIA.dom.kiaCanvas.createSelectionLayersOutline();
}

export default Index;