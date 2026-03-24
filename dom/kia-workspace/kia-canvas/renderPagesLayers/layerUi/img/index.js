
import types from './types/index.js';

function Index(l) {
	let typeTarget = 'img';
	if(l.clipBaseLayer) typeTarget = 'clipPath';
	return types[typeTarget](l);
}

export default Index;