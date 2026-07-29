 
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

		const oldParentId = props.dropInfo.dragTarget.closest('[data-item]').dataset.item;
		const newParentId = props.dropInfo.dropTarget.dataset.item;
		const historyItem = {
			flag: 'moveSelectionInDiffParent',
        	selectionId: props.dropInfo.dragTarget.dataset.item,
        	undo: {
        		oldParentObj: structuredClone(KIA.nodesMap[oldParentId]),
        		newParentObj: structuredClone(KIA.nodesMap[newParentId]),
        	},
        	redo: {
        		oldParentObj: structuredClone(KIA.nodesMap[newParentId]),
        		newParentObj: structuredClone(KIA.nodesMap[oldParentId]),
        	}
		}

		const data = {
        	dragTarget: props.dropInfo.dragTarget.dataset.item,
        	dropTarget: props.dropInfo.dropTarget.dataset.item,
        	position: props.dropInfo.dropPosition,
            source: 'kiaLayers',
        };

        KIA.actions.share.moveLayerInTree(data);

        switch(props.dropInfo.dropPosition) {
        	case 'before':
        		props.dropInfo.dropTarget.before(props.dropInfo.dragTarget);
        		break;

        	case 'after':
        		props.dropInfo.dropTarget.after(props.dropInfo.dragTarget);
        		break;

        	case 'inside':
        		props.dropInfo.dropTarget.classList.add('show');
        		props.dropInfo.dropTarget.appendChild(props.dropInfo.dragTarget);
        		props.dropInfo.dragTarget.scrollIntoView();
        		break;        	
        }

        KIA.actions.ui.history.addItem(historyItem);

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