
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
	
		KIA.actions.share.setLayerSelectionAttributes(layerNewObj);		
	},	

	layerSelected: function(){
		const layerObj = KIA.dom.read.getSelectionLayerObject();


		// Node 
		const nodeGroup = KIA.registry.tags.canTransform(layerObj.nodeName) || 'others';		
		let nodeName = layerObj.nodeName;
		if(nodeGroup === 'others') {
			props.root.$id.switchTag.$id.summary.setAttribute('data-other-node-name', nodeName);
		} else {
			props.root.$id.switchTag.$id.summary.removeAttribute('data-other-node-name');
		}
		props.root.dataset.nodeGroup = nodeGroup;
		props.root.$id.switchTag.value = nodeName;
		

		// InnerText
		props.root.$id.tagInnerText.value = '';
		if(layerObj.textContent) {
			props.root.$id.tagInnerText.value = layerObj.textContent;
		}


		// URL
		props.root.$id.tagSrc.value = '';
		if(layerObj.attributes.src) {
			const src = layerObj.attributes.src;
			if(!KIA.state.assets.map[src]) props.root.$id.tagSrc.value = src;			
		}		
	},
};

export default Index;