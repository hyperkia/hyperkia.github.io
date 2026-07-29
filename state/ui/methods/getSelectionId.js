
import props from '../props.js';

function Index(){
	return props.selectionKeys?.values().next().value;
}

export default Index;