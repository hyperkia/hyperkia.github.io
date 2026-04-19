
import props from '../utils/props.js';

class Index {

	static handler(e){
		if(props.eTarget.childElementCount === 0) this.textContentLayer();
	}

	static textContentLayer(){
		const t = props.eTarget;
		const id = t.dataset.layer;
		const isTextContent = KIA.state.layers.map[id].textContent;
		isTextContent && KIA.utils.dom.enableEditingAndFocusEnd(t);
	}

	
}

export default Index;