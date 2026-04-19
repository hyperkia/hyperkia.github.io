 
import props from '../utils/props.js';
 
class Index {

	static handler(e){
		if(e.buttons != 1) return
        if(e.button === 2) return;
		
		this.draglayer(e);		
	}
	
	static draglayer(e){
		if (!props.eTarget.hasPointerCapture(e.pointerId)) return false;
		if(!props.dropInfo.dragging) return;
		props.pointer.moveX = e.clientX;
		props.pointer.moveY = e.clientY;

		const isBeyondTolerance = KIA.utils.pointer.isBeyondTolerance(props.pointer.downX, props.pointer.downY, props.pointer.moveX, props.pointer.moveY, 6)		
		if(!isBeyondTolerance) return;

		const layersElRect = props.root.$id.layers.getBoundingClientRect();
		const left = e.clientX+8;
		const top =  e.clientY-layersElRect.top;
		props.root.$id.dragNodeGhost.style.cssText = `
			opacity: 1;
			left: ${left}px;
			top: ${top}px;
		`;

		props.dropInfo.dropTarget?.removeAttribute('data-drop-position');
		props.dropInfo.dropTarget = props.root.shadowRoot.elementFromPoint(e.clientX, e.clientY)?.closest('.layer-node');
		if(!props.dropInfo.dropTarget) return;
		if (props.dropInfo.dropTarget === props.dropInfo.dragTarget) return;
		const dropTargetNodeName = KIA.state.layers.map[props.dropInfo.dropTarget.dataset.item].nodeName;
		const isDropTargetcanHaveChildren = KIA.registry.tags.canHaveChildren(dropTargetNodeName);

		const mouseX = e.clientX;
		const mouseY = e.clientY;
		const dropTargetRect = props.dropInfo.dropTarget.getBoundingClientRect();
		const dropTargetBAHeight = (dropTargetRect.height * 25) / 100;


		// Before
		if(dropTargetRect.top <= mouseY && dropTargetRect.top+dropTargetBAHeight >= mouseY) {
			props.dropInfo.dropPosition = 'before';
		} else if (dropTargetRect.bottom >= mouseY && dropTargetRect.bottom-dropTargetBAHeight <= mouseY) {
			// After			
			props.dropInfo.dropPosition = 'after';
		} else if(mouseY > dropTargetRect.top + dropTargetBAHeight && mouseY < dropTargetRect.bottom - dropTargetBAHeight) {
			// Inside
			if(isDropTargetcanHaveChildren) {				
				props.dropInfo.dropPosition = 'inside';
			} else {				
				props.dropInfo.dropPosition = 'after';
			}
		}
		props.dropInfo.dropTarget.dataset.dropPosition = props.dropInfo.dropPosition;		
	}
}

export default Index;