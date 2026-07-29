function Index(hexValue) {
	KIA.state.ui.setColorValue(hexValue);
	KIA.kiaApp.dispatchEvent(new CustomEvent('changeColorPickerValue', {
	  bubbles: true,
	  composed: true,
	})); 
}

export default Index;