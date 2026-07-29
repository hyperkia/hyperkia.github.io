
import keyMap from './keyMap/index.js';

function Index(keyCode){
	keyCode = keyCode.toLowerCase();
	if(keyCode === 'delete') keyCode = 'keydelete';
	keyMap[keyCode]?.();
}

export default Index;