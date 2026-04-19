
 
import props from '../utils/props.js';
 
class Index {

	static handler(e){
		if(e.button === 2) return;

		this.draglayer(e);
	}
	
	static draglayer(e){
		props.eTarget.releasePointerCapture(e.pointerId);
		props.root.$id.dragNodeGhost.style.opacity = 0;
		props.dropInfo.dropTarget?.removeAttribute('data-drop-position');

		const isBeyondTolerance = KIA.utils.pointer.isBeyondTolerance(props.pointer.downX, props.pointer.downY, props.pointer.moveX, props.pointer.moveY, 6)		
		if(!isBeyondTolerance) return;

		if(!props.dropInfo.dropTarget || !props.dropInfo.dragTarget) return;
		if (props.dropInfo.dropTarget === props.dropInfo.dragTarget) return;		

        KIA.actions.share.moveLayerInTree({
        	dragTarget: props.dropInfo.dragTarget.dataset.item,
        	dropTarget: props.dropInfo.dropTarget.dataset.item,
        	position: props.dropInfo.dropPosition,
            source: 'kiaLayers',
        });

        props.dropInfo.dragging = false;		
		props.dropInfo.dragTarget = null;
		props.dropInfo.dropTarget = null;
		props.dropInfo.dropPosition = '';

		props.pointer.downX = 0;
		props.pointer.downY = 0;
		props.pointer.moveX = 0;
		props.pointer.moveY = 0;
	}
}

export default Index;






