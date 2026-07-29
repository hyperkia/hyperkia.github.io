import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

    static debounceTimer = null;

    static handler(e) {
        if (props.eTarget.matches('.canvas-layer')) this.setTextContent();
    }

    static setTextContent() {
        clearTimeout(this.debounceTimer);
        const layerEl = props.eTarget;
        this.debounceTimer = setTimeout(() => {
            const id = layerEl.dataset.layer;
            const textContent = layerEl.textContent;

            KIA.actions.kiaLayers.setTextContent({
                textContent,
                id,
                source: 'kiaCanvas',
            });

            KIA.actions.ui.history.addItem({
                flag: 'inputTextLayer',
                selectionId: id,
                undo: {
                    selectionTextContent: layerEl.dataset.oldValue,
                },
                redo: {                    
                    selectionTextContent: layerEl.innerHTML,
                }                
            });

        }, 200);
    }
}

export default Index;