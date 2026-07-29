const Index = {
  prop: 'font-family',

  inputTo(result) {
    const inputStyle = result.inputStyle;
    result.style[this.prop] = inputStyle[this.prop];
  },

  selectionTo(result) {
    const layerObj = KIA.dom.read.getSelectionLayerObject();

    if(layerObj.style[this.prop]) result[this.prop] = layerObj.style[this.prop];
    if(!layerObj.style[this.prop]) result[this.prop] = 'Select';
  },

  computedTo(result) {   
    
  }
};


export default Index;