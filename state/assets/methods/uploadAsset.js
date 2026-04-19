
import props from '../props.js';

function Index(asset){
	props.map[asset.id] = asset;
	KIA.observer.assets.observe('uploadAssets');
}

export default Index;