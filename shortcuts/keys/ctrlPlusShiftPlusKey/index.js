
import keyMap from './keyMap/index.js';

function Index(keyCode){
	keyCode = keyCode.toLowerCase();
	keyMap[keyCode]?.();
}

export default Index;