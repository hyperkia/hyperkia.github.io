
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(e){
		if(props.eTAction === 'uploadFileInput') {
			const fileObj = props.root.$id.uploadFileInput.files[0];
			const assetObj = {
				key:crypto.randomUUID(),
				name: fileObj.name,
				size: fileObj.size,
				type: fileObj.type,	
				blob: fileObj,
				url: URL.createObjectURL(fileObj),
			};

			KIA.actions.kiaAssetsManagerModal.uploadAssets(assetObj);
		}
	}

} 

export default Index;