
import {readPsd} from './library/ag-psd/ag-psd.mjs';
import props from '../props/index.js';
import pages from './pages/index.js';
import layers from './layers/index.js';

async function Index() {
	const data = {};
	const buffer = await props.file.arrayBuffer();
	props.psdRaw = readPsd(buffer);	
	data.pages = pages();
	const pageKey = Object.keys(data.pages)[0];
	data.layers = await layers(pageKey);
	data.pages[pageKey].layers = Object.keys(data.layers);
	props.psdRaw = null;

	return data;	
}

export default Index;