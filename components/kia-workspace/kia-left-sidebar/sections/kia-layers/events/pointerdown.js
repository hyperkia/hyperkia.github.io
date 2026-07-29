 
import props from '../utils/props.js';
 
class Index {

	static handler(e){
		if(props.eTarget.closest('.title')) this.draglayer(e);
	}
	
	static draglayer(e){
		props.eTarget.setPointerCapture(e.pointerId);
		props.dropInfo.dragTarget = props.eTarget.closest('.layer-node');
		if(!props.dropInfo.dragTarget) return;
		if(props.dropInfo.dragTarget.querySelector('[contenteditable="true"]')) {
			props.dropInfo.dragging = false;
			return;			
		}
		props.dropInfo.dragging = true;
		if(!props.dropInfo.dragTarget) return;
		props.root.$id.dragNodeGhost.textContent = props.dropInfo.dragTarget.querySelector('.header')?.dataset.title;
		props.pointer.downX = e.clientX;
		props.pointer.downY = e.clientY;
	}
}

export default Index;