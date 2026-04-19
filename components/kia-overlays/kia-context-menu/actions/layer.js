const Index = {
    fire(action) {
        this[action]();
    },

    bringToFront() {
        KIA.actions.kiaLayers.bringToFrontSelectionLayer();
    },

    sendToBack() {
        KIA.actions.kiaLayers.sendToBackSelectionLayer();
    },

    lockUnlock() {

    },

    hideShow() {

    },

    duplicate() {

    },

    copy() {

    },

    paste() {

    },

    delete() {
        const id = KIA.state.ui.getSelectionId();
        KIA.actions.kiaLayers.deleteLayer(id);
        const keys = new Set().add('canvas');
        KIA.actions.share.setSelectionKeys(keys);
    },

}

export default Index;