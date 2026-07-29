import props from '../../utils/props.js';
import methods from '../../utils/methods.js';

class Index {

    static panning = false;
    static parentEl = null;
    static parentKey = null;
    static svgLayer = null;
    static circleLayer = null;
    

    static handlePointerDown(e) {
        props.root.setPointerCapture(e.pointerId);
              

        this.parentEl = props.eTarget.closest('[data-layer]') || props.eTarget.closest('[data-page]');
        if (!this.parentEl) return;
        if(!KIA.registry.tags.canHaveChildren(this.parentEl.tagName)) {
            this.parentEl = this.parentEl.parentElement;
        }
        this.parentKey = this.parentEl.dataset.layer || this.parentEl.dataset.page;
 
        this.svgLayer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.svgLayer.classList.add('canvas-layer');
        this.svgLayer.setAttribute('data-layer', crypto.randomUUID());
        this.svgLayer.setAttribute('draggable', false);
        this.parentEl.append(this.svgLayer);

        this.circleLayer = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        this.circleLayer.setAttribute('fill', '#d9d9d9');
        this.circleLayer.classList.add('canvas-layer');
        this.circleLayer.setAttribute('data-layer', crypto.randomUUID());
        this.circleLayer.setAttribute('draggable', false);
        this.svgLayer.append(this.circleLayer);

        this.cpsdXY = KIA.dom.read.getCanvasElementScaleCoords({ e, element: this.parentEl });
    } 

    static handlePointerMove(e) {

        if (!props.root.hasPointerCapture(e.pointerId)) return false;        
        if (!this.svgLayer) return false;

        this.cpsmXY = KIA.dom.read.getCanvasElementScaleCoords({ e, element: this.parentEl });
        
        let dx = this.cpsmXY.x - this.cpsdXY.x;
        let dy = this.cpsmXY.y - this.cpsdXY.y;

        let left = Math.min(this.cpsdXY.x, this.cpsmXY.x);
        let top = Math.min(this.cpsdXY.y, this.cpsmXY.y);

        let width = Math.abs(dx);
        let height = Math.abs(dy);

        const size = Math.max(width, height);
        width = size;
        height = size;

        if (dx < 0) left = this.cpsdXY.x - size;
        if (dy < 0) top = this.cpsdXY.y - size;

        const viewBox = `0 0 ${width} ${height}`;
        
        const svgStyle = {
            left: left + 'px',
            top: top + 'px',
            width: width + 'px',
            height: height + 'px',
        };        

        Object.assign(this.svgLayer.style, svgStyle);
        this.svgLayer.setAttribute('viewBox', viewBox);

        const cx = width / 2;
        const cy = height / 2;
        const r = width / 2;

        this.circleLayer.setAttribute('cx', cx);
        this.circleLayer.setAttribute('cy', cy);
        this.circleLayer.setAttribute('r', r);

        const svgid = this.svgLayer.dataset.layer;
        const circleId = this.circleLayer.dataset.layer;

        KIA.actions.kiaCanvas.creatingElements([
            { 
                id: svgid,
                parent: this.parentKey,
                tagName: this.svgLayer.tagName,
                attributes: { viewBox },
                style: svgStyle,
                children: [],
                instanceof: 'svg',
                stack: [],
            },
            { 
                id: circleId,
                parent: svgid,
                tagName: this.circleLayer.tagName,
                attributes: {
                    fill: '#d9d9d9',
                    cx,
                    cy,
                    r,
                },
                style: {},
                children: [circleId],
                instanceof: 'svg',
                stack: [],
            }
        ]);
        
        if (!this.panning) {            
            const ids = new Set().add(circleId);
            KIA.actions.share.setSelectionIds(ids);
            this.panning = true;
        }
    }
 
    static handlePointerUp(e) {
        props.root.releasePointerCapture(e.pointerId);
        this.panning = false;

        if (props.isActualMove && this.parentEl) {
            const svgid = this.svgLayer.dataset.layer;
            const circleId = this.circleLayer.dataset.layer;

            const svgElCss = KIA.utils.css.getElementCssProperty(
                this.svgLayer, 
                ['left','top','width','height']
            );

            const size = parseFloat(svgElCss.width); // width == height

            const cx = size / 2;
            const cy = size / 2;
            const r = size / 2;

            const newLayerObjs = [
                {
                    id: svgid,
                    parent: this.parentKey,
                    tagName: this.svgLayer.tagName,
                    attributes: {
                        viewBox: `0 0 ${size} ${size}`,
                    },
                    style: {                        
                        ...svgElCss,
                    }, 
                    children: [circleId],
                    instanceof: 'svg',
                    stack: [],
                },
                {
                    id: circleId,
                    parent: svgid,
                    tagName: this.circleLayer.tagName,
                    attributes: {
                        fill: '#d9d9d9',
                        cx,
                        cy,
                        r,
                    },
                    style: {}, 
                    children: [],
                    instanceof: 'svg',
                    stack: [],
                },                
            ];   

            KIA.canvasRefMap[svgid] = this.svgLayer;
            KIA.canvasRefMap[circleId] = this.circleLayer;
            KIA.actions.kiaCanvas.createElements(newLayerObjs);
            const ids = new Set().add(circleId);
            KIA.actions.share.setSelectionIds(ids);
        } else {
            this.svgLayer?.remove();
            this.svgLayer = null;
        }        

        this.parentEl = null;
    }

    static handlePointerCancel(){
        this.svgLayer?.remove();
        this.svgLayer = null;
        this.panning = false;
        this.parentEl = null;
    }
}

export default Index;