const Index = {
  prop: 'background-color',

  inputTo(result) {
    const layerObj = KIA.dom.read.getSelectionLayerObject();
    const inputStyle = result.inputStyle;
    if(!inputStyle['background-color']) return;
    if(layerObj.instanceof === 'svg' && layerObj.tagName==='svg') result.style['background-color'] = inputStyle['background-color'];
    if(layerObj.instanceof === 'svg' && layerObj.tagName!=='svg') result.attributes.fill = inputStyle['background-color'];
    if(layerObj.instanceof === 'html') result.style['background-color'] = inputStyle['background-color'];
  },

  selectionTo(result) {
    const layerObj = KIA.dom.read.getSelectionLayerObject();
    if(layerObj.instanceof === 'svg' && layerObj.tagName==='svg') result['background-color'] = layerObj.style['background-color'];
    if(layerObj.instanceof === 'svg' && layerObj.tagName!=='svg') result['background-color'] = layerObj.attributes.fill;
    if(layerObj.instanceof === 'html') result['background-color'] = layerObj.style['background-color'];
    if(!result['background-color']) result['background-color'] = '';
  },

  computedTo(result) {
    
  }
};


export default Index;