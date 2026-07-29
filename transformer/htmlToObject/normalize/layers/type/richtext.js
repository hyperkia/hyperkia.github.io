
import props from '../../../utils/props.js';
import cssprops from '../cssprops/index.js';
import attributes from '../attributes/index.js';

function Index(){
	const l = props.activeParseLayer.layer;
	const s = props.activeParseLayer.layerStyle;


	const obj = {
		css: {},
		innerText: '',
	};
	obj.innerText = l.innerText;
	for(let cp in cssprops) Object.assign(obj.css, cssprops[cp](s));

	l.querySelectorAll('*').forEach((c)=>{
		const cs = window.getComputedStyle(c);
		const cCss = {};
		for(let cp in cssprops) Object.assign(cCss, cssprops[cp](cs));
		c.style.cssText = KIA.utils.css.objectToCss(cCss);

		const ca = c.attributes;
		const cAttrs = {};
		for(let atr in attributes) Object.assign(cAttrs, attributes[atr](ca));
		for(let atr in cAttrs) c.setAttribute(atr, cAttrs[atr]);
	});

	obj.innerText = l.innerHTML;
	l.dataset.htmlparse = true;

	return obj;
}

export default Index;