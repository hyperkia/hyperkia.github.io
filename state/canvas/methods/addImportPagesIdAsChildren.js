
import props from '../props.js';

function Index(ids){
	props.children.push(...ids);	
}

export default Index;