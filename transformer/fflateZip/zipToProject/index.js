
import methods from '../utils/methods.js';

async function Index(file){
	const data = await methods.importFromFile(file);
	if(data.database.name !== 'hyperkia') return null;
	methods.normalizeAssets(data);
	methods.normalizePages(data);
	methods.normalizeCanvas(data);
	methods.normalizeLayers(data);
	return data
}

export default Index;