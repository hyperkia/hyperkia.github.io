function Index(source, result) {

	if(source === 'propsInputToSelection') {
		const inputStyle = result.inputStyle;
		const parentObj = KIA.dom.read.getSelectionParentObject();
		const selectionObj = KIA.dom.read.getSelectionObject();

		const parentWidth = parseFloat(parentObj.style.width) || 0;
		const elementWidth = parseFloat(selectionObj.style.width) || 0;

		let left = 0;

		switch (inputStyle['justify-content']) {

			case 'flex-start':
				left = 0;
				break;

			case 'flex-end':
				left = parentWidth - elementWidth;
				break;

			case 'center':
				left = (parentWidth - elementWidth) / 2;
				break;
		}

		result.style.left = left + 'px';
	}

}

export default Index;