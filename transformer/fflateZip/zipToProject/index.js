
import methods from '../utils/methods/index.js';

async function Index(file){
	const data = await methods.importFromFile(file);
	if(data.database.name !== 'hyperkia') return null;
	if(data.canvas.dataStructure !== 'DOM - v2') return null;
	data.idsMap = {};
	methods.normalizeAssets(data);
	methods.normalizePages(data);
	methods.normalizeLayers(data);
	methods.normalizeChildren(data);
	methods.normalizeAssetsIds(data);
	
	return data
}

export default Index;