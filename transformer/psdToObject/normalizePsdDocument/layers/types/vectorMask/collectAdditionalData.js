
import props from '../../../../props/index.js';
import methods from '../methods/index.js';

function Index(obj) {
	const l = props.activeParseLayer.layer;
	const shape = methods.getSvgPathD(l);

	obj.css.left = shape.left+'px';
	obj.css.top = shape.top+'px';
	obj.sattrs.d = shape.d;
	obj.attrs.viewBox = shape.viewBox;

	if(l.blendMode !== 'normal') obj.css['mix-blend-mode'] = l.blendMode;

	const overlay = l.effects?.gradientOverlay?.[0];
	if(overlay) obj.gradient = methods.getGradientData(overlay);

	// Baselayer
	if(l.clipping) {
		obj.clipBaseLayer = [];
		const mostBound = {
			top: [],
			left: [],
			right: [],
			bottom: [],
		};
		const baseLayer = props.activeParseLayer.clipBaseLayer.children || [props.activeParseLayer.clipBaseLayer];
		baseLayer.forEach((bl)=>{
			mostBound.top.push(bl.top);
			mostBound.left.push(bl.left);
			mostBound.right.push(bl.right);
			mostBound.bottom.push(bl.bottom);
		});

		obj.css.left = Math.min(...mostBound.left);
		obj.css.top = Math.min(...mostBound.top);
		obj.css.width = Math.max(...mostBound.right) - obj.css.left + 'px';
		obj.css.height = Math.max(...mostBound.bottom) - obj.css.top + 'px';		

		baseLayer.forEach((bl)=>{
			const blShape = methods.getSvgPathD(bl);
			const bsData = {
				nodeName: 'path',
				name: bl.name,
				d: blShape.d,
				left: (bl.left - obj.css.left),
				top: (bl.top - obj.css.top),				
			};
			if(bl.vectorFill.color) bsData.fill = KIA.utils.css.rgbaObjectToCss(bl.vectorFill.color);
			obj.clipBaseLayer.push(bsData);			
		})

		obj.css.left += 'px';
		obj.css.top += 'px';
	}

	// Clipping	
	if(l.clipping) {
		obj.clipSiblingLayer = [];
		props.activeParseLayer.clipSiblingLayer.forEach((scl)=>{
			const sclShape = methods.getSvgPathD(scl);
			const sclData = {
				nodeName: 'path',
				name: scl.name,
				d: sclShape.d,								
				left: (sclShape.left - obj.css.left.replace('px','')),
				top: (sclShape.top - obj.css.top.replace('px','')),
			};			
			if(scl.vectorFill.color) sclData.fill = KIA.utils.css.rgbaObjectToCss(scl.vectorFill.color);
			obj.clipSiblingLayer.push(sclData);
		})		
	}
}

export default Index;