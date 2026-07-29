
import keyMap from './keyMap/index.js';

function Index(key){
	key = key.toLowerCase();
	keyMap[key]?.();
}

export default Index;