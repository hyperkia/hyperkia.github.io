
const Index = {

	icons: null,

	async loadIcons(){
		const iconsRes = await fetch('/data/icons/fontawesome/icons.json');
		this.icons = await iconsRes.json();			
	},

	getIcon: function(name){
		return this.icons[name];
	},

	getIcons: function(){
		return this.icons;
	},

	getIconsName: function(){
		return Object.keys(this.icons);
	},

}

Index.loadIcons();

export default Index;
