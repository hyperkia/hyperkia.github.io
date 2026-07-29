
import props from '../utils/props.js';

const Index = {
	inputInnerText: function(e){
		const textContent = props.eTarget.value;
		const id = KIA.state.ui.getSelectionId();
		KIA.actions.kiaLayers.setTextContent({
			textContent,
			id,
			source: 'kiaCssTag',
		}); 
	},

	inputSrc: function(src){	
		const id = KIA.state.ui.getSelectionId();
		const layerNewObj = {
			id,
			attributes: {
				src,
			}
		};
	
		KIA.actions.kiaLayers.setAttributes(layerNewObj);		
	},	

	layerSelected: function(){
		const layerObj = KIA.dom.read.getSelectionLayerObject();

		// Node 
		const nodeGroup = KIA.registry.tags.canTransform(layerObj.tagName) || 'others';		
		let tagName = layerObj.tagName;
		if(nodeGroup === 'others') {
			props.root.$id.switchTag.$id.summary.setAttribute('data-other-node-name', tagName);
		} else {
			props.root.$id.switchTag.$id.summary.removeAttribute('data-other-node-name');
		}
		props.root.dataset.nodeGroup = nodeGroup;
		props.root.$id.switchTag.value = tagName;
		

		// InnerText
		props.root.$id.tagInnerText.value = '';
		if(layerObj.textContent) {
			props.root.$id.tagInnerText.value = layerObj.textContent;
		}


		// URL
		props.root.$id.tagSrc.value = '';
		if(layerObj.attributes.src) {
			const src = layerObj.attributes.src;
			if(!KIA.state.assets.getAssets()[src]) props.root.$id.tagSrc.value = src;			
		}		
	},
};

export default Index;