 import props from '../utils/props.js';
 import methods from '../utils/methods.js';

 class Index {

     static handler(e) {
         const c = KIA.state.ui.getProp('colorPicker');
         const p = c.target.payload.property;
         if (c.target.type === 'css' && p === 'background-color') {
            KIA.propInputs['background-color'].value = c.value;
            KIA.managers.style.propsInputToSelection({[p]: c.value});
         }
     }



 }

 export default Index;