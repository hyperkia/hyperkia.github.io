
const Index = {

	css: {},
	pagesOrder: [],
	fonts: {},
	createdAt: '',
	updatedAt: '',

	loadData(data){
		this.projectFonts = data.projectFonts || {};
		if(data.css) this.css = data.css;
		if(data.pagesOrder) this.pagesOrder = data.pagesOrder;
		KIA.observer.canvas.observe('loadData');
		if(data.createdAt) this.createdAt = data.createdAt;
		if(data.updatedAt) this.updatedAt = data.updatedAt;
	},

	setCss(css){
		Object.assign(this.css, css);
		KIA.observer.canvas.observe('setCss');
	},

	addNewPagesKey(pageKeys){
		const pageKeysArr = Array.isArray(pageKeys) ? pageKeys : [pageKeys];
		this.pagesOrder.push(...pageKeysArr);
	},

	addFont(fonts){		
		for(let f in fonts) this.projectFonts[f] = fonts[f];
		KIA.observer.canvas.observe('changeProjectFonts');
	},

	deleteFont(name){
		delete this.projectFonts[name];
		KIA.observer.canvas.observe('changeProjectFonts');
	},
}

export default Index;