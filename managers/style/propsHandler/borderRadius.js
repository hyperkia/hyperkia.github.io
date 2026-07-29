const Index = {
  prop: 'border-radius',
  sides: ['border-top-left-radius', 'border-top-right-radius', 'border-bottom-left-radius', 'border-bottom-right-radius'],

  inputTo(result) {
    const inputStyle = result.inputStyle;
    let value = inputStyle[this.prop];
    if(value === 'px' || value === '0px') value = '0px'
    result.style[this.prop] = value;   
    this.sides.forEach(s => result.style[s]=value);
  },

  selectionTo(result) {
    const layerObj = KIA.dom.read.getSelectionLayerObject();
    
    if(layerObj.style[this.prop]) result[this.prop] = parseInt(layerObj.style[this.prop]);
    if(!layerObj.style[this.prop]) result[this.prop] = '';

    const isAllSame = this.sides.every(s=>layerObj.style[s]===layerObj.style[this.sides[0]]);
    if(isAllSame) result[this.prop] = parseInt(layerObj.style[this.sides[0]]);
  },

  computedTo(result) {
    
  }
};


export default Index;