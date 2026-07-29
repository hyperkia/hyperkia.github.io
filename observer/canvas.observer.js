
const Index = {
	observe(payload) {
		this[payload]();
	},

	loadCanvas(){
		KIA.dom.kiaCanvas.updateCanvasStyle();
		KIA.dom.kiaCssTypography.setProjectFontFamilyList();
		KIA.dom.kiaCssTypography.setSelectedFontFamilyWeights();
	},

	changeProjectFonts(){
		KIA.dom.kiaCssTypography.setProjectFontFamilyList();
		KIA.dom.kiaCssTypography.setSelectedFontFamilyWeights();
	},

	setStyle(){
		KIA.dom.kiaCanvas.updateCanvasStyle()
	}
} 

export default Index; 