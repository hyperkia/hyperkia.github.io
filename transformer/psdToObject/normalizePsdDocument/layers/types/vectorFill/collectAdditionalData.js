
import props from '../../../../props/index.js';
import methods from '../methods/index.js';

function Index(obj) {

	const l = props.activeParseLayer.layer;

	// Gradient
	const overlay = l.effects?.gradientOverlay[0]
	if(overlay) objRef.gradient = methods.getGradientData(overlay);

	// Clipping	
	if(l.clipping) {

		obj.clipPath = [];

		const maskLayers = props.activeParseLayer.clipBaseLayer.children || [props.activeParseLayer.clipBaseLayer];
		
		maskLayers.forEach((ml)=>{

			const mlRect = {
				width: (ml.right - ml.left),
				height: (ml.bottom - ml.top),
				left: ml.left,
				top: ml.top,
			}

			let clipPathShape = null;
			if(ml.vectorMask) {
				const shape = methods.getSvgPathD(ml);
				clipPathShape = {
					nodeName: 'path',
					d: shape.d,
					viewBox: shape.viewBox,
					width: (l.right - l.left),
					height: (l.bottom - l.top),
					left: (l.left - mlRect.left),
					top: (l.top - mlRect.top),
				};
				
			} else if (ml.placedLayer) {				
				const src = ml.canvas.toDataURL();
				const blobSrc = KIA.utils.string.base64ToBlobUrl(src);
				clipPathShape = {					
					nodeName: 'img',
					src: blobSrc,
					width: (ml.right - ml.left),
					height: (ml.bottom - ml.top),
					left: (mlRect.left - l.left),
					top: (mlRect.top - l.top),
				}
			}
			obj.clipPath.push(clipPathShape);
		})
	}
}

export default Index;