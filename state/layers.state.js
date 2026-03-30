
const Index = {

	map: {},

	visibilityKey: '',
	pointerLockKey: '',

	renderLayers: function(layers){
		this.map = layers;
		KIA.observer.layers.observe('renderLayers');
	},

	creatingLayer: function(layerObj){
		this.map[layerObj.key] = layerObj;		
	},

	createdLayer(layerObj){
		this.map[layerObj.key] = layerObj;		
		KIA.observer.layers.observe('createdLayer');
	},

	importLayers(layers){
		Object.assign(this.map, layers);
		KIA.observer.layers.observe('importLayers');
	},

	setSelectionInnerText: function(innerText){
		const key = KIA.state.ui.selectionKeys.values().next().value;
		this.map[key].innerText = innerText;
		KIA.observer.layers.observe('setSelectionInnerText');
	},

	setSelectionSrc: function(layerObj){
		const key = KIA.dom.read.getSelectionKey();
		Object.assign(this.map[key], layerObj);
		KIA.observer.layers.observe('setSelectionSrc');
	},

	setSelectionZIndex: function(zIndex){
		const key = KIA.dom.read.getSelectionKey();
		this.map[key].css['z-index'] = zIndex;
		KIA.observer.layers.observe('setSelectionZIndex');
	}, 

	movingLayer: function(layerObj) {
		Object.assign(this.map[layerObj.key].css, layerObj.css);
		KIA.observer.layers.observe('movingLayer');
	},

	movingLayers: function(layersObj) {
		if(layersObj.save) {
			layersObj.layers.forEach((l)=>{
				Object.assign(this.map[l.key].css, l.css);
			})
		}
	},

	setCssPropToLayer: function(obj) {
		Object.assign(this.map[obj.key].css, obj.css);
		obj.type = 'setCssPropToLayer';
		KIA.observer.layers.observe(obj);
	},

	setSelectionNodeName: function(nodeName) {
		const key = KIA.dom.read.getSelectionKey();
		this.map[key].nodeName = nodeName;
		KIA.observer.layers.observe('setSelectionNodeName');
	},

	deleteSelectedLayer(){
		const key = KIA.dom.read.getSelectionKey();
		delete this.map[key];
		KIA.observer.layers.observe('deleteSelectedLayer');
	},

	changeLayerVisiblility(key, css){
		this.visibilityKey = key;
		Object.assign(this.map[key].css, css);
		KIA.observer.layers.observe('changeLayerVisiblility');
	},

	changelayerPointerLock(key, css){
		this.pointerLockKey = key;
		Object.assign(this.map[key].css, css);
		KIA.observer.layers.observe('changelayerPointerLock');
	},

	

	setSelectionStringProperties(layerNewObj){
		const key = layerNewObj.key;		
		for(let [p,v] of Object.entries(layerNewObj)) {
			if(typeof v === 'string') this.map[key][p] = v;
		}
		KIA.observer.layers.observe('setSelectionStringProperties');
	},
	setSelectionAttributes(layerNewObj){
		const key = layerNewObj.key;
		Object.assign(this.map[key].attrs, layerNewObj.attrs);
		KIA.observer.layers.observe('setSelectionAttributes');
	},
	setSelectionCss(layerNewObj){
		const key = layerNewObj.key;
		Object.assign(this.map[key].css, layerNewObj.css);
		KIA.observer.layers.observe('setSelectionCss');
	},
	setSelectionSAttributes(layerNewObj){
		// const key = layerNewObj.key;
		// if(this.map[key].sattrs) Object.assign(this.map[key].sattrs, layerNewObj.sattrs);
	},
	setSelectionSCss(layerNewObj){
		const key = layerNewObj.key;
		Object.assign(this.map[key].scss, layerNewObj.scss);
		KIA.observer.layers.observe('setSelectionSCss');
	},
	setSelectionStack(layerNewObj){
		const key = layerNewObj.key;
		const layerObj = this.map[key];
		const newStacks = layerNewObj.stack;
		for(let k in newStacks) {
			if(!layerObj.stack[k]) {
				layerObj.stack[k] = newStacks[k];
				continue;
			}
			Object.assign(layerObj.stack[k], newStacks[k]);
		}
	},
	setSelectionAssets(layerNewObj){
		const key = layerNewObj.key;
		Object.assign(this.map[key].assets, layerNewObj.assets);
		KIA.observer.layers.observe('setSelectionAssets');
	},

}

export default Index;