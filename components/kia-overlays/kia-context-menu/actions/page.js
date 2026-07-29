
import props from '../utils/props.js';

const Index = {
    fire(action) {
        this[action]?.();
    },

    lockUnlock() {
        const id = KIA.state.ui.getSelectionId();
        KIA.actions.kiaPages.changeLock(id);
    },

    hideShow() {
        const id = KIA.state.ui.getSelectionId();
        KIA.actions.kiaPages.changeVisibility(id);
    },

    duplicate() {
        const id = KIA.state.ui.getSelectionId();
        KIA.actions.kiaPages.duplicatePage(id);
    },

    rename(){
        const id = KIA.state.ui.getSelectionId();
        const editElement = KIA.kiaPages._qs(`[data-page="${id}"] .page-name`);
        KIA.utils.dom.enableEditingAndFocusEnd(editElement);
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

    openPreview(){
        const id = KIA.state.ui.getSelectionId();
        window.open(`/preview.html?id=${id}`, "_blank");
    },
    
    delete() {
        const id = KIA.state.ui.getSelectionId();
        KIA.actions.kiaPages.deletePage(id);
    },
}

export default Index;