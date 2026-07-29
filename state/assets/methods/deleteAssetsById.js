
import props from '../props.js';

function Index(ids){
	ids = Array.isArray(ids) ? ids : [ids];
	ids.forEach(id => delete props.map[id]);
}

export default Index;