
const Index = {

  prop: 'font-weight',

  inputTo(result) {
    const inputStyle = result.inputStyle;
	const value = inputStyle[this.prop];
	if(value.includes('-italic')) {
		result.style[this.prop] = value.split('-')[0];
		result.style['font-style'] = 'italic';
	} else {
		result.style['font-style'] = 'normal';
		result.style[this.prop] = value;
	}
  },

  selectionTo(result) {
  	const layerObj = KIA.dom.read.getSelectionLayerObject();

    if(layerObj.style[this.prop]) result[this.prop] = layerObj.style[this.prop];
	if(!layerObj.style[this.prop]) result[this.prop] = '400';
  },

  computedTo(result) {   
    
  }
};


export default Index;