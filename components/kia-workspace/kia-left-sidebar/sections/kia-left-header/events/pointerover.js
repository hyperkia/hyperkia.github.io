
import props from '../utils/props.js';
import methods from '../utils/methods.js';
 
class Index {

	static handler(e){
		if(props.eTarget.closest('.menu-item')) this.activeCurrentNavMenuItem();
	}

	static activeCurrentNavMenuItem(){
		const oldActiveItem = props.root._qs('.menu-item.hover');
		const currentActiveItem = props.eTarget.closest('.menu-item');

		props.root._qsAll(`[data-lavel="${currentActiveItem.dataset.lavel}"]`).forEach((el)=>{
			el.classList.remove('hover');
		})
		currentActiveItem.classList.add('hover');		
	}
}

export default Index;