
const Index = {

  prop: 'opacity',

  inputTo(result) {
    const inputStyle = result.inputStyle;	
	result.style[this.prop] = (inputStyle[this.prop]/100).toFixed(2)
	if(inputStyle[this.prop] === '') result.style[this.prop] = 1;
  },

  selectionTo(result) {
    const layerObj = KIA.dom.read.getSelectionLayerObject();

    if(layerObj.style[this.prop]) {
		result[this.prop] = (layerObj.style[this.prop]*100).toFixed(0);			
	}

	if(!layerObj.style[this.prop]) result[this.prop] = '';
  },

  computedTo(result) {   
    
  }
};


export default Index;