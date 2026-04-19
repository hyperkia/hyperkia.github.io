
const prop = 'rotate90';

function Index(source, result) {

	const layerObj = KIA.dom.read.getSelectionLayerObject();

	if(source === 'propsInputToSelection') {	
		let rotate = parseInt(layerObj.style['rotate'])||0;
		rotate = rotate>=360 ? 360-rotate : rotate;
		result.style['rotate'] = rotate + 90 + 'deg';		
	}


}

export default Index;


