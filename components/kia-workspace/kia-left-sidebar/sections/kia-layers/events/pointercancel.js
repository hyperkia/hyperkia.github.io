
 
import props from '../utils/props.js';
 
class Index {

	static handler(e){
		if(e.button === 2) return;

		this.draglayer(e);
	}
	
	static draglayer(e){
		props.eTarget.releasePointerCapture(e.pointerId);
		props.dropInfo.dragging = false;
		props.root.$id.dragNodeGhost.style.opacity = 0;
		props.dropInfo.dragTarget = null;
		props.dropInfo.dropTarget = null;
		props.dropInfo.dropPosition = '';
		props.dropInfo.dropTarget?.removeAttribute('data-drop-position');

		props.pointer.downX = 0;
		props.pointer.downY = 0;
		props.pointer.moveX = 0;
		props.pointer.moveY = 0;
	}
}

export default Index;






