
import props from '../../../utils/props.js';


function Index(){
	for(const [lId, lObj] of Object.entries(props.parse.layers)) {

		if(!lObj.textContent) continue;                            

		const fz = parseInt(lObj.style['font-size']);
		const lh = parseInt(lObj.style['line-height']);

		if(fz > lh) lObj.style['line-height'] = fz + 10 + 'px';
	}
}

export default Index;