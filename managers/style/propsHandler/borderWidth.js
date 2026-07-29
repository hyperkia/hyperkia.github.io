const Index = {
  prop: 'border-width',
  sides: ['border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width'],

  inputTo(result) {
    const layerObj = KIA.dom.read.getSelectionLayerObject();

    const inputStyle = result.inputStyle;
    let value = inputStyle[this.prop];
    if(value === 'px' || value === '0px') value = '0px';
    
    if(layerObj.instanceof === 'html') {
      result.style['border-width'] = value;
      result.style['border-top-width'] = value;
      result.style['border-right-width'] = value;
      result.style['border-bottom-width'] = value;
      result.style['border-left-width'] = value;
    }
    if(layerObj.instanceof === 'svg') {
      result.attributes['stroke-width'] = value;
    }
  },

  selectionTo(result) {
    const layerObj = KIA.dom.read.getSelectionLayerObject();
    
    if(layerObj.instanceof === 'html') { 
      if(layerObj.style[this.prop]) result[this.prop] = parseInt(layerObj.style[this.prop]);
      if(!layerObj.style[this.prop]) result[this.prop] = '';
      const isAllSame = this.sides.every(s=>layerObj.style[s]===layerObj.style[this.sides[0]]);
      if(isAllSame) result[this.prop] = parseInt(layerObj.style[this.sides[0]]);
    } 

    if(layerObj.instanceof === 'svg') {
      if(layerObj.attributes['stroke-width']) result[this.prop] = parseInt(layerObj.attributes['stroke-width']);
      if(!layerObj.attributes['stroke-width']) result[this.prop] = '';     
    }
  },

  computedTo(result) {
    
  }
};


export default Index;