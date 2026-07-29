const Index = {
  prop: 'color',

  inputTo(result) {
    const inputStyle = result.inputStyle;
    result.style[this.prop] = inputStyle[this.prop];
  },

  selectionTo(result) {
    const layerObj = KIA.dom.read.getSelectionLayerObject();
    
    if(layerObj.style[this.prop]) result[this.prop] = layerObj.style[this.prop];
    if(!result[this.prop]) result[this.prop] = '';
    if(result[this.prop] === 'transparent') result[this.prop] = '';
  },

  computedTo(result) {
    
  }
};


export default Index;