
const Index = {

	fonts: null,

	async loadFonts(){
		const fontsRes = await fetch('/data/fonts/google/fonts.json');
		this.fonts = await fontsRes.json();					
	},

	getFont: function(name){
		return this.fonts[name];
	},

	getFonts: function(){
		return this.fonts;
	},

	getFontsName: function(){
		return Object.keys(this.fonts);
	},

}

Index.loadFonts();

export default Index;
