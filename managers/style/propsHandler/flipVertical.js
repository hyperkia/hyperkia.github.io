const Index = {

  inputTo(result) {
    
  },

  selectionTo(result) {
    
  },

  computedTo(result) {   
    const layerObj = KIA.dom.read.getSelectionLayerObject();
    
    let scale = layerObj.style.scale;
    let scaleX = '';
    let scaleY = '';

    if(scale) {
      [scaleX, scaleY] = scale.split(' ');
      scaleY = -(scaleY);
    } else {
      scaleX = 1; 
      scaleY = -1;  
    }

    result.style.scale = `${scaleX} ${scaleY}`;
  }
};


export default Index;