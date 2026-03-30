 
import props from '../utils/props.js';
import actions from '../actions/index.js';

const Index = {
	inputInnerText: function(e){
		const innerText = props.eTarget.value;
		KIA.actions.share.inputSelectionInnerText({
			innerText, 			
			save: e.type==='keyup',
		});
	},

	inputSrc: function(e){		
		const layerNewObj = actions('inputSrc');
		KIA.actions.share.setLayerSelectionAttributes(layerNewObj);
		KIA.actions.share.setLayerSelectionAssets(layerNewObj);
	},	

	layerSelected: function(){
		const layerObj = KIA.dom.read.getSelectionLayerObject();

		// Node 
		const relatedNodes = KIA.dom.read.getRelatedNodes(layerObj.nodeName);
		let nodeName = layerObj.nodeName;
		if(!relatedNodes) {
			nodeName = 'others';
			props.root.$id.switchTag.$id.details.children[0].dataset.otherNodeName = layerObj.nodeName;
			props.root.$id.switchTag.$id.details.children[0].part.add('others');
		} else {
			props.root.$id.switchTag.$id.details.children[0].removeAttribute('data-other-node-name');
			props.root.$id.switchTag.$id.details.children[0].part.remove('others');
		}
		props.root.$id.switchTag.value = nodeName;

		// InnerText
		props.root.$id.tagInnerText.innerText = '';
		if(layerObj.innerText) {
			props.root.$id.tagInnerText.value = layerObj.innerText;
		}

		// URL
		props.root.$id.tagSrc.value = '';
		if(layerObj.attrs.src) props.root.$id.tagSrc.value = layerObj.attrs.src;		
		props.root.$id.tagSrc.removeAttribute('data-asset');
	},
};

export default Index;