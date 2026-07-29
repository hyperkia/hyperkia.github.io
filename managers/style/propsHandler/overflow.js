
const Index = {

  prop: 'overflow',

  inputTo(result) {
    const inputStyle = result.inputStyle;
	if(inputStyle.overflow) result.style[this.prop] = 'hidden';
	if(!inputStyle.overflow) result.style[this.prop] = 'visible';
  },

  selectionTo(result) {
    const layerObj = KIA.dom.read.getSelectionLayerObject();

    result[this.prop] = false;
	if(layerObj.style[this.prop] === 'hidden') result[this.prop] = true;
	if(layerObj.style[this.prop] === 'visible') result[this.prop] = false;
  },

  computedTo(result) {   
    
  }
};


export default Index;