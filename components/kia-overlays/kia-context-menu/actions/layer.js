
import props from '../utils/props.js';

const Index = {
    fire(action) {
        this[action]?.();
    },

    bringToFront() {
        const selectionId = KIA.state.ui.getSelectionId();
        KIA.actions.kiaLayers.bringToFront(selectionId);
    },

    sendToBack() {
        const selectionId = KIA.state.ui.getSelectionId();
        KIA.actions.kiaLayers.sendToBack(selectionId);
    },

    lockUnlock() {
        const id = KIA.state.ui.getSelectionId();
        KIA.actions.kiaLayers.changeLock(id);        
    },

    hideShow() {
        const id = KIA.state.ui.getSelectionId();
        KIA.actions.kiaLayers.changeVisibility(id);        
    },

    duplicate() {
        const id = KIA.state.ui.getSelectionId();
        KIA.actions.kiaLayers.duplicateLayer(id);
    },

    copy() {
        const id = KIA.state.ui.getSelectionId();
        KIA.actions.kiaLayers.copyLayer(id);
    },

    group(){
        const id = KIA.state.ui.getSelectionId();
        KIA.actions.kiaLayers.groupLayer(id);        
    },

    paste() {     
        const id = KIA.state.ui.getSelectionId();
        const parentEl = KIA.dom.read.getClosestParentAbleHtmlNode(KIA.canvasRefMap[id]);        
        if(parentEl.matches('.page')) {
            KIA.actions.kiaPages.pasteLayerFromContextMenu(props.pointer);
        } else if(parentEl.matches('.canvas-layer')) {
            KIA.actions.kiaLayers.pasteLayerFromContextMenu(props.pointer);
        }
    },

    delete() {
        const id = KIA.state.ui.getSelectionId();
        KIA.actions.kiaLayers.deleteLayer(id);        
    },

}

export default Index;