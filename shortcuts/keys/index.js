
import key from './key/index.js';

function Index(e){
	const pressAltKey = e.altKey;
	const pressShiftKey = e.shiftKey;
	const pressCtrlKey = e.ctrlKey;
	const pressKey = e.key;

	if(!pressAltKey && !pressShiftKey && !pressCtrlKey) key(pressKey);
}

export default Index;

