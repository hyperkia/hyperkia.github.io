
import props from '../props.js';

function Index(assetsObj){
	for(let [aId, aObj] of Object.entries(assetsObj)) props.map[aId] = aObj;
	KIA.observer.assets.observe('uploadAssets');
}

export default Index;