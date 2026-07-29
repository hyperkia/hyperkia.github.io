const Index = {
  prop: 'width',

  inputTo(result) {
    const inputStyle = result.inputStyle; 
    result.style[this.prop] = inputStyle[this.prop];
    if(inputStyle[this.prop] === 'px') result.style[this.prop] = '0px';
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