
import props from '../../../utils/props.js';
const name = 'src';

function Index(attrs){
	const result = {};
	let v = attrs[name]?.value;
	if(v) {		
		v = KIA.utils.url.relativeToAbsoluteUrl(v,props.htmlurl)
		result[name] = v;
	}
	return result;
}

export default Index;