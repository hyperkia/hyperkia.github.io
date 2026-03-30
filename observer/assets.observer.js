
const Index = {
	observe(payload) {
		this[payload]?.();
	},

	uploadAssets(){
		KIA.dom.kiaAssetsManagerModal.renderAssetList();
	},
} 

export default Index; 