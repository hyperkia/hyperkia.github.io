
const Index = {

  prop: 'pointer-events',

  inputTo(result) {
    const inputStyle = result.inputStyle;	
	result.style[this.prop] = inputStyle[this.prop];
  },

  selectionTo(result) {
    
  },

  computedTo(result) {   
    
  }
};


export default Index;