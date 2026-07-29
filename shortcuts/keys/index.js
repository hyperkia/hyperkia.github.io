
import key from './key/index.js';
import ctrlPlusKey from './ctrlPlusKey/index.js';
import shiftPlusKey from './shiftPlusKey/index.js';
import ctrlPlusShiftPlusKey from './ctrlPlusShiftPlusKey/index.js';


function Index(e){
	const pressAltKey = e.altKey;
	const pressShiftKey = e.shiftKey;
	const pressCtrlKey = e.ctrlKey;
	const pressKeyCode = e.code;

	if(!pressAltKey && !pressShiftKey && !pressCtrlKey) key(pressKeyCode);
	if(!pressAltKey && !pressShiftKey && pressCtrlKey) ctrlPlusKey(pressKeyCode);
	if(!pressAltKey && pressShiftKey && !pressCtrlKey) shiftPlusKey(pressKeyCode);
	if(!pressAltKey && pressShiftKey && pressCtrlKey) ctrlPlusShiftPlusKey(pressKeyCode);
}

export default Index;

