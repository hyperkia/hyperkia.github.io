
import props from '../../../utils/props.js';
import cssprops from '../cssprops/index.js';

function Index(){
	const l = props.activeParseLayer.layer;
	const s = props.activeParseLayer.layerStyle;
	const obj = {
		css: {},
	};

	for(let cp in cssprops) Object.assign(obj.css, cssprops[cp](s));
	return obj;
}

export default Index;