
import pages from './pages/index.js';
import layers from './layers/index.js';
import props from '../utils/props.js';

async function Index() {
	const data = {};
	data.pages = await pages();
	const layersData = layers();
	data.layers = layersData.layers;
	data.pages[props.activeParseLayer.pageKey].layers = layersData.layersOrder;
	return data;	
}

export default Index;