
import props from '../../../../props/index.js';
import scss from './scss/index.js';
import sattrs from './sattrs/index.js';
import collectAdditionalData from './collectAdditionalData.js'

function Index() {

	const l = props.activeParseLayer.layer;
	
	const obj = {
		nodeName: 'path',
		css: {},
		attrs: {},
		scss: {},
		sattrs: {},
	};

	for(let p in scss) Object.assign(obj.scss, scss[p](l));
	for(let sa in sattrs) Object.assign(obj.sattrs, sattrs[sa](l));

	collectAdditionalData(obj);

	return obj;
}

export default Index;





