
import props from '../../../utils/props.js';
import cssprops from '../cssprops/index.js';

function Index(){
	const l = props.activeParseLayer.layer;
	const s = props.activeParseLayer.layerStyle;

	const obj = {
		attrs: {},
		css: {},
	};
	const srcArr = [];
	for(let source of l.children ) srcArr.push({
		src: source.src,
		type: source.type,
	});
	const videoAttributes = ['controls', 'autoplay', 'muted', 'loop'];
	videoAttributes.forEach((atr)=>{
		if(l[atr]) obj.attrs[atr] = l[atr];
	});

	if(l.src) srcArr.push({
		src: l.src,
		type: '',
	});
	obj.attrs.src = srcArr;

	for(let cp in cssprops) Object.assign(obj.css, cssprops[cp](s));

	return obj;
}

export default Index;