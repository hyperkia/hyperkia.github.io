
import props from '../utils/props.js';

const Index = {

	updateEffect(){
		const layerId = KIA.state.ui.getSelectionId();
		const stackId = props.root.dataset.stack;
		const shadow = props.root.dataset.shadow;
		const value = {};

		value.offsetX = props.root.$id.offsetX.value || 0;
		value.offsetY = props.root.$id.offsetY.value || 0;
		value.blurRadius = props.root.$id.blurRadius.value || 0;
		value.color = props.root.$id.color.value || '#000000';	
				
		if(shadow === 'box-shadow') {
			value.spreadRadius = props.root.$id.spreadRadius.value || 0;
			value.inset = props.root.$id.inset.value === 'true' ? true : false;			
		} 	

		const layerNewObj = {
			id: layerId,
			updateStack: {
				id: stackId,
				value,
			}
		};		

		KIA.actions.kiaLayers.updateStack(layerNewObj);
	},
};

export default Index;