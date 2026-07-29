
const Index = {

  inputTo(result) {
    
  },

  selectionTo(result) {
    
  },

  computedTo(result) {
    const layerObj = KIA.dom.read.getSelectionLayerObject();
    let rotate = parseInt(layerObj.style['rotate'])||0;
    rotate = rotate>=360 ? 360-rotate : rotate;
    result.style['rotate'] = rotate + 90 + 'deg';
  }
};


export default Index;