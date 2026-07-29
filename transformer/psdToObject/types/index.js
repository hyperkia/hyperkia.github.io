
import props from '../utils/props.js';
import methods from '../utils/methods/index.js';

import canvas from './canvas/index.js';
import pages from './pages/index.js';
import layers from './layers/index.js';
import assets from './assets/index.js';

async function Index(){
	methods.setUniqueIdToNodes();
	methods.createNodeParentChildren();
	methods.detectAnyChildClipping();

	await canvas();
	await pages();
	await layers();
	await assets();
	
	methods.normalizeAssets();	
	methods.normalizeTextLayerParentHeight();
	methods.normalizeProjectFont();
	methods.normalizeColorAsSrgb();
}

export default Index;