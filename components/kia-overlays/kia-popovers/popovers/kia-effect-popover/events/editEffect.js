import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

    static handler(e) {
        if (e.type === 'editEffect') this.openPopover(e);
        if (props.eTarget.getRootNode().host?.dataset.event === 'closePopover') popoverBase.closePopover(e);
    }

    static openPopover(e) {
        KIA.kiaPopovers.classList.add('show');
        props.root.classList.add('show');
        const layerObj = KIA.dom.read.getSelectionLayerObject();

        const stackId = e.detail.stackId;
        props.root.dataset.stack = stackId;
        const stackObj = layerObj.stack.find(s => s.id===stackId);        
        props.root.dataset.shadow = stackObj.name;
        const value = stackObj.value;

        props.root.$id.offsetX.value = stackObj.value.offsetX;
        props.root.$id.offsetY.value = stackObj.value.offsetY;
        props.root.$id.blurRadius.value = stackObj.value.blurRadius;
        props.root.$id.spreadRadius.value = stackObj.value.spreadRadius;
        props.root.$id.inset.value = stackObj.value.inset;
        props.root.$id.color.value = stackObj.value.color;

        KIA.actions.ui.shortcutsKey.pushEscapeStack({
            close: props.root.close,
            id: 'kiaEffectPopover',
        });
    }
}

export default Index;

