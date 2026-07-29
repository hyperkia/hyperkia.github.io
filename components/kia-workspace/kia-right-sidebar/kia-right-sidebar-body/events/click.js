
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(e){		
		if(props.eRTarget.closest('.tabmenu-item')) this.switchTab();
	}

	static switchTab(){
        const target = props.eRTarget.dataset.target;
        props.root._qs('.tabmenu-item.active')?.classList.remove('active');
        props.root._qs('.tab-content.active')?.classList.remove('active');
        props.root._qs(`[data-target="${target}"]`).classList.add('active');
        props.root.$id[target+'TabContent']?.classList.add('active');
    }
	
}

export default Index;