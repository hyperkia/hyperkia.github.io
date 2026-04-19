import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {


    static defaultData = {
        'box-shadow': {
            inset: false,
            offsetX: 0,
            offsetY: 4,
            blur: 10,
            spread: 0,
            color: '#00000040',
        },
        'text-shadow': {
            offsetX: 0,
            offsetY: 2,
            blur: 4,
            color: '#0000004D',
        },
        'drop-shadow': {
            offsetX: 0,
            offsetY: 4,
            blur: 6,
            color: '#00000040',
        }
    };

    static handler(e) {
        if (props.eRTAction === 'addEffect') this.addEffect();
        if (props.eTAction === "effectEdit") this.editEffect();
        if (props.eTAction === "effectVisible") this.filterVisible();
        if (props.eTAction === "effectRemove") this.removeFilter();
    }

    static addEffect() {
        const layerId = KIA.state.ui.getSelectionId();
        const stackId = crypto.randomUUID();
        const type = props.root.$id.effectOptions.value;
        const template = props.root.$id.effectItemTemplate.content.cloneNode(true);
        const effectItemEl = template.querySelector('.effect-item');
        effectItemEl.dataset.shadow = type;
        effectItemEl.dataset.stack = stackId;
        props.root.$id.effectItems.append(template);
        const newLayerObj = {
            id: layerId,
            newStack: {
                id: stackId,
                type,
                enable: true,
                value: structuredClone(this.defaultData[type]),
            }
        };

        KIA.actions.kiaLayers.addStack(newLayerObj);
    }

    static editEffect() {
        const stackId = props.eTarget.closest('[data-stack]').dataset.stack;
        KIA.kiaApp.dispatchEvent(new CustomEvent('editEffect', {
            bubbles: true,
            composed: true,
            detail: { stackId }
        }));
    }

    static removeFilter() {
        const layerId = KIA.state.ui.getSelectionId();
        const stackId = props.eTarget.closest('[data-stack]').dataset.stack;
        const effectItemEl = props.root._qs(`[data-stack="${stackId}"]`);

        effectItemEl.classList.add('deleting');
        setTimeout(() => {
            effectItemEl.remove();
        }, 500);

        const layerNewObj = {
            id: layerId,
            stackId,
        };
        KIA.actions.kiaLayers.removeStack(newLayerObj);
    }

    static filterVisible() {
        const layerId = KIA.state.ui.getSelectionId();
        const stackId = props.eTarget.closest('[data-stack]').dataset.stack;
        const visibleButtonEl = props.root._qs(`[data-stack="${stackId}"] .effect-visibility`);
        const enable = visibleButtonEl.dataset.effectVisible === 'true' ? false : true;;
        visibleButtonEl.dataset.effectVisible = enable;

        const newLayerObj = {
            id: layerId,
            updateStack: {
                id: stackId,
                enable,             
            }
        };
        
        KIA.actions.kiaLayers.updateStack(newLayerObj);
    }

}

export default Index;