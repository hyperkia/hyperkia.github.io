
import types from './types/index.js';

function Index(l) {
	let typeTarget = 'path';
	if(l.clipBaseLayer) typeTarget = 'clipPath';
	return types[typeTarget](l);
}

export default Index;