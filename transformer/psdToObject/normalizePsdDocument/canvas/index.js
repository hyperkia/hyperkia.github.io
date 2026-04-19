
import props from '../../props/index.js';

function Index(data){
	return {
		children: [Object.keys(data.pages)[0]],
	}
}

export default Index;