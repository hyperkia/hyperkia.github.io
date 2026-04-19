import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

    panning = false;
    parentEl = null;
    parentKey = null;
    svgLayer = null;
    pathLayer = null;

    static handlePointerDown(e) {        
        props.root.setPointerCapture(e.pointerId);

        this.parentEl = props.eTarget.closest('[data-layer]') || props.eTarget.closest('[data-page]');
        if (!this.parentEl) return;
        if(!KIA.registry.tags.canHaveChildren(this.parentEl.nodeName)) {
            this.parentEl = this.parentEl.parentElement;
        }
        this.parentKey = this.parentEl.dataset.layer || this.parentEl.dataset.page;
 
        this.svgLayer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.svgLayer.classList.add('canvas-layer');
        this.svgLayer.setAttribute('data-layer', crypto.randomUUID());
        this.svgLayer.setAttribute('draggable', false);
        this.svgLayer.setAttribute('viewBox', props.moreIcon.viewBox);
        this.svgLayer.setAttribute('preserveAspectRatio', 'none');
        this.parentEl.append(this.svgLayer);

        this.pathLayer = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        this.pathLayer.setAttribute('fill', '#d9d9d9');
        this.pathLayer.setAttribute('d', props.moreIcon.pathD);
        this.pathLayer.classList.add('canvas-layer');
        this.pathLayer.setAttribute('data-layer', crypto.randomUUID());
        this.pathLayer.setAttribute('draggable', false);
        this.svgLayer.append(this.pathLayer);

        this.cpsdXY = KIA.dom.read.getCanvasElementScaleCoords({e, element : this.parentEl});
    } 

    static handlePointerMove(e) {
        if (!props.root.hasPointerCapture(e.pointerId)) return false;        
        if ((!this.svgLayer)) return false;

        this.cpsmXY = KIA.dom.read.getCanvasElementScaleCoords({e, element : this.parentEl});
        
        const left = parseInt(Math.min(this.cpsdXY.x, this.cpsmXY.x));
        const top = parseInt(Math.min(this.cpsdXY.y, this.cpsmXY.y));
        const width = parseInt(Math.abs(this.cpsmXY.x - this.cpsdXY.x));
        const height = parseInt(Math.abs(this.cpsmXY.y - this.cpsdXY.y));
        
        const svgStyle = {
            left: left+'px',
            top: top+'px',
            width: width+'px',
            height: height+'px',            
        };        
        Object.assign(this.svgLayer.style, svgStyle);

        const svgid = this.svgLayer.dataset.layer;
        const pathId = this.pathLayer.dataset.layer;

        KIA.actions.kiaCanvas.creatingElements([
            { 
                id: svgid,
                parent: this.parentKey,
                nodeName: this.svgLayer.nodeName,
                attributes: {
                    viewBox: this.svgLayer.getAttribute('viewBox'),
                },
                style: {
                    ...svgStyle,                    
                },
                children: [pathId],
                instanceof: 'svg',
                stack: [],
            },
            { 
                id: pathId,
                parent: svgid,
                nodeName: this.pathLayer.nodeName,
                attributes: {
                    fill: '#d9d9d9',
                    d: this.pathLayer.getAttribute('d'),
                },
                style: {},
                children: [],
                instanceof: 'svg',
                stack: [],
            }
        ]);
        
        if(!this.panning) {            
            const ids = new Set().add(pathId);
            KIA.actions.share.setSelectionKeys(ids);
            this.panning = true;
        }
    }
 
    static handlePointerUp(e) {
        props.root.releasePointerCapture(e.pointerId);
        this.panning = false;     

        if (props.isActualMove && props.activePage) {
            const svgid = this.svgLayer.dataset.layer;
            const pathId = this.pathLayer.dataset.layer;
            const svgElCss = KIA.utils.css.getElementCssProperty(this.svgLayer, ['left','top','width','height']);

            const newLayerObjs = [
                {
                    id: svgid,
                    parent: this.parentKey,
                    nodeName: this.svgLayer.nodeName,
                    attributes: {
                        viewBox: this.svgLayer.getAttribute('viewBox'),
                    },
                    style: {                        
                        ...svgElCss,
                        translate: 'none',                        
                    }, 
                    children: [pathId],
                    instanceof: 'svg',
                    stack: [],
                },
                {
                    id: pathId,
                    parent: svgid,
                    nodeName: this.pathLayer.nodeName,
                    attributes: {
                        fill: '#d9d9d9',
                        d: this.pathLayer.getAttribute('d'),
                        translate: 'none',
                    },
                    style: {}, 
                    children: [],
                    instanceof: 'svg',
                    stack: [],
                },                
            ];   

            KIA.canvasRefMap[svgid] = this.svgLayer;
            KIA.canvasRefMap[pathId] = this.pathLayer;
            KIA.actions.kiaCanvas.createElements(newLayerObjs);
            const ids = new Set().add(pathId);
            KIA.actions.share.setSelectionKeys(ids);
        } else {
            this.svgLayer?.remove();
            this.svgLayer = null;
        }        
    }
}

export default Index;