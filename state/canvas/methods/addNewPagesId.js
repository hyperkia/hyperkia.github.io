
import props from '../props.js';

function Index(pageIds){
	const pageIdsArr = Array.isArray(pageIds) ? pageIds : [pageIds];
	props.children.push(...pageIdsArr);
}

export default Index;