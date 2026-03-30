
const Index = {
	observe(payload) {
		this[payload]();
	},

	loadData(){
		KIA.dom.kiaCanvas.updateCanvasCss();
		KIA.dom.kiaCssTypography.setProjectFontFamilyList();
		KIA.dom.kiaCssTypography.setSelectedFontFamilyWeights();
	},

	changeProjectFonts(){
		KIA.dom.kiaCssTypography.setProjectFontFamilyList();
		KIA.dom.kiaCssTypography.setSelectedFontFamilyWeights();
	},

	setCss(){
		KIA.dom.kiaCanvas.updateCanvasCss()
	}
} 

export default Index; 