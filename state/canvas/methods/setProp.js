
import props from '../props.js';

function Index(propValue){
	for(let prop in propValue) {
		props[prop] = propValue[prop];
	}
}

export default Index;