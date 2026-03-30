
import props from '../utils/props.js';

const Index = {
	updateEffect(){
		const layerKey = KIA.dom.read.getSelectionKey();
		const stackKey = props.root.dataset.stack;
		const shadow = props.root.dataset.shadow;

		const offsetX = (props.root.$id.offsetX.value || 0)+'px';
		const offsetY = (props.root.$id.offsetY.value || 0)+'px';
		const blurRadius = (props.root.$id.blurRadius.value || 0)+'px';
		const color = props.root.$id.color.value || '#000';
		
		let spreadRadius = '';
		let inset = '';
		if(shadow === 'box-shadow') {
			spreadRadius = (props.root.$id.spreadRadius.value || 0)+'px';
			inset = props.root.$id.inset.value === 'true' ? 'inset' : '';
		} 

		const value = `${offsetX} ${offsetY} ${blurRadius} ${spreadRadius} ${color} ${inset}`.replaceAll('  ',' ');

		const layerNewObj = {
			key: layerKey,
			stack: {
				[stackKey]: {
					key: stackKey,
		 			value,
				}
			}
		};
		KIA.actions.share.setLayerSelectionStack(layerNewObj);
	},
};

export default Index;