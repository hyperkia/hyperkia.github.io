
function Index(source, result) {

	if(source === 'propsInputToSelection') {
		const inputStyle = result.inputStyle;
		const parentObj = KIA.dom.read.getSelectionParentObject();
		const selectionObj = KIA.dom.read.getSelectionObject();

		const parentHeight = parseInt(parentObj.style.height);
		const elementHeight = parseInt(selectionObj.style.height);

		let top = 0;

		switch (inputStyle['align-items']) {
			case 'flex-start':
				top = 0;
				break;

			case 'flex-end':
				top = parentHeight - elementHeight;
				break;

			case 'center':
				top = (parentHeight - elementHeight) / 2;
				break;
		}

		result.style.top = top+'px';
	}

}

export default Index;



