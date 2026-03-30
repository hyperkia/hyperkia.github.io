
const Index = {
	map: {},

	visibilityKey: '',
	pointerLockKey: '',

	loadPages: function(pages){
		this.map = pages;
		KIA.observer.pages.observe('renderPageList');
	},
 
	addNewPage: function(newPage){
		this.map[newPage.key] = newPage;
		KIA.observer.pages.observe('renderPageList');
	},

	importPages(pages){
		Object.assign(this.map, pages);
		KIA.observer.pages.observe('renderPageList');
	},

	pageNameChange(pageObj) { 
		this.map[pageObj.key].name = pageObj.name;		
		KIA.observer.pages.observe('pageNameChange');
	},

	deleteSelectedPage: function(css) {
		const key = KIA.dom.read.getSelectionKey();
		delete this.map[key];
		KIA.observer.pages.observe('deleteSelectedPage');
	},

	changePageVisiblility(key, css){
		this.visibilityKey = key;
		Object.assign(this.map[key].css, css);
		KIA.observer.pages.observe('changePageVisiblility');
	},

	changePagePointerLock(key, css){
		this.pointerLockKey = key;
		Object.assign(this.map[key].css, css);
		KIA.observer.pages.observe('changePagePointerLock');
	},

	setLayers(){},

	setSelectionProperties(pageNewObj){
		// const key = KIA.dom.read.getSelectionKey();
		// const pageObj = this.map[key];
		// for(let p in pageNewObj) {
		// 	const vTypeOf = KIA.utils.dom.getTypeOf(pageNewObj[p]);
		// 	if(vTypeOf === 'string') pageObj[p] = pageNewObj[p];
		// 	// if(vTypeOf === 'array') console.log('---');
		// 	if(vTypeOf === 'object') Object.assign(pageObj[p], pageNewObj[p])						
		// }
	},

	setSelectionCss(pageNewObj){
		const key = pageNewObj.key;
		Object.assign(this.map[key].css, pageNewObj.css);
		KIA.observer.pages.observe('setSelectionCss');
	}
} 

export default Index;