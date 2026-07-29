
const Index = {

  prop: 'text-transform',

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