

const Index = {

  prop: 'rotate',

  inputTo(result) {
    const inputStyle = result.inputStyle;	
	result.style[this.prop] = inputStyle[this.prop];
	if(inputStyle[this.prop] === 'deg') result.style[this.prop] = '0deg';
  },

  selectionTo(result) {
    const layerObj = KIA.dom.read.getSelectionLayerObject();

    if(layerObj.style[this.prop]) {
		result[this.prop] = parseInt(layerObj.style[this.prop]);
	}

	if(!layerObj.style[this.prop]) result[this.prop] = '';
  },

  computedTo(result) {   
    
  }
};


export default Index;