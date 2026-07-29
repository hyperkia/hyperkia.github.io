
const Index = {

  prop: 'stroke-dasharray',

  inputTo(result) {
    const inputStyle = result.inputStyle;	
	result.attributes[this.prop] = inputStyle[this.prop];
	if(!inputStyle[this.prop]) result.attributes[this.prop] = 'none';
  },

  selectionTo(result) {
    const layerObj = KIA.dom.read.getSelectionLayerObject();

	if(!layerObj.attributes) return;
	if(layerObj.attributes[this.prop]) {
		result[this.prop] = layerObj.attributes[this.prop];
	}

	if(!layerObj.attributes[this.prop] || layerObj.attributes[this.prop].trim() === 'none') result[this.prop] = '';    
  },

  computedTo(result) {   
    
  }
};


export default Index;