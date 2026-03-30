
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(e){
		const d = e.detail;
		props.eTarget.dataset.source = 'assets';
		const assetObj = KIA.state.assets.map[d.key];
		const inputEl = props.root.$id.tagSrc;
		inputEl.value = assetObj.url;
		methods.inputSrc(e);			
	}

}

export default Index;