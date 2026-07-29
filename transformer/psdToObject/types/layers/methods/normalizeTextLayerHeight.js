
import props from '../../../utils/props.js';

function Index(){
	for(const [lId, lObj] of Object.entries(props.parse.layers)) {		
		if(lObj.tagName !== 'P') continue;

		const s = lObj.style;
		if(parseInt(s.height) <= parseInt(s['line-height'])) s.height = parseInt(s['line-height']) + 5 + 'px';
	}
}

export default Index;