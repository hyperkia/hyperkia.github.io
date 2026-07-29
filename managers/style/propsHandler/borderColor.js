const Index = {
  prop: 'border-color',

  inputTo(result) {
    const layerObj = KIA.dom.read.getSelectionLayerObject();
    
    const inputStyle = result.inputStyle;
    if(!inputStyle['border-color']) return;
    if(layerObj.instanceof === 'svg') result.attributes.stroke = inputStyle['border-color'];
    if(layerObj.instanceof === 'html') result.style['border-color'] = inputStyle['border-color']; 
  },

  selectionTo(result) {
    const layerObj = KIA.dom.read.getSelectionLayerObject();
    
    if(layerObj.instanceof === 'svg') result['border-color'] = layerObj.attributes.stroke;
    if(layerObj.instanceof === 'html') result['border-color'] = layerObj.style['border-color'];
    if(!result['border-color']) result['border-color'] = '';
  },

  computedTo(result) {
    
  }
};


export default Index;