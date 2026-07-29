
import {readPsd} from './library/ag-psd/ag-psd.mjs';
import props from './utils/props.js';
import types from './types/index.js';


async function Index(file) {
	props.parse.canvas = {};
	props.parse.pages = {};
	props.parse.layers = {};
	props.parse.assets = {};
	props.parse.nodes = {};
	
	props.fonts.clear();
	props.uploadedFile = file;
	let bufferFile = await props.uploadedFile.arrayBuffer();
	props.rawPsd = readPsd(bufferFile);
	props.rawPsd.hyperkiaPage = true;
	await types();

	props.nodes = {};
	props.rawPsd = null;
	bufferFile = null;
	props.uploadedFile = null;

	return props.parse;	
}

export default Index; 