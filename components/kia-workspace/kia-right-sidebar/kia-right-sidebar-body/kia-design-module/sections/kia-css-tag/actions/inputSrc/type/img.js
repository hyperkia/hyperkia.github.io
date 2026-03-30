
import props from '../../../utils/props.js';

function Index(){
	const key = KIA.dom.read.getSelectionKey();
	const layerNewObj = {key};
	const inputEl = props.eTarget;
	const source = inputEl.dataset.source;
	const assetObj = KIA.state.assets.selectedAsset;
	
	if(source === 'assets') {
		layerNewObj.assets = {
			src: assetObj.key
		};
		layerNewObj.attrs = {
			src: '',
		}
	} else if (source === 'input') {
		layerNewObj.attrs = {
			src: inputEl.value
		};
		layerNewObj.assets = {
			src: ''
		};
	}
	
	return layerNewObj;
}

export default Index;