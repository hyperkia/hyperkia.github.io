
import props from '../props.js';

function Index(assetsObj){
	for(let [aKey, aObj] of Object.entries(assetsObj)) props.map[aKey] = aObj;
	KIA.observer.assets.observe('uploadAssets');
}

export default Index;