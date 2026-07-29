import props from '../../utils/props.js';
import methods from '../../utils/methods.js';

class Index {

    static panning = false;
    static parentEl = null;
    static parentKey = null;
    static svgLayer = null;
    static lineLayer = null;
    

    static handlePointerDown(e) {
        props.root.setPointerCapture(e.pointerId);
         

        this.parentEl = props.eTarget.closest('[data-layer]') || props.eTarget.closest('[data-page]');
        if (!this.parentEl) return;
        this.parentEl = KIA.dom.read.getClosestParentAbleHtmlNode(this.parentEl);
        this.parentKey = this.parentEl.dataset.layer || this.parentEl.dataset.page;
 
        this.svgLayer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.svgLayer.classList.add('canvas-layer');
        this.svgLayer.setAttribute('data-layer', crypto.randomUUID());
        this.svgLayer.setAttribute('draggable', false);
        this.parentEl.append(this.svgLayer);

        this.lineLayer = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        this.lineLayer.setAttribute('stroke', '#d9d9d9');
        this.lineLayer.setAttribute('stroke-width', 2);
        this.lineLayer.classList.add('canvas-layer');
        this.lineLayer.setAttribute('data-layer', crypto.randomUUID());
        this.lineLayer.setAttribute('draggable', false);
        this.svgLayer.append(this.lineLayer);

        this.cpsdXY = KIA.dom.read.getCanvasElementScaleCoords({ e, element: this.parentEl });
    } 

    static handlePointerMove(e) {

        if (!props.root.hasPointerCapture(e.pointerId)) return false;        
        if (!this.svgLayer) return false;

        this.cpsmXY = KIA.dom.read.getCanvasElementScaleCoords({ e, element: this.parentEl });
        
        const dx = this.cpsmXY.x - this.cpsdXY.x;
        const dy = this.cpsmXY.y - this.cpsdXY.y;

        const left = Math.min(this.cpsdXY.x, this.cpsmXY.x);
        const top = Math.min(this.cpsdXY.y, this.cpsmXY.y);
        const width = Math.abs(dx);
        const height = Math.abs(dy);

        const viewBox = `0 0 ${width} ${height}`;
        
        const svgStyle = {
            left: left + 'px',
            top: top + 'px',
            width: width + 'px',
            height: height + 'px',
            'background-color': 'transparent',
        };        

        Object.assign(this.svgLayer.style, svgStyle);
        this.svgLayer.setAttribute('viewBox', viewBox);

        const x1 = dx >= 0 ? 0 : width;
        const y1 = dy >= 0 ? 0 : height;
        const x2 = dx >= 0 ? width : 0;
        const y2 = dy >= 0 ? height : 0;

        this.lineLayer.setAttribute('x1', x1);
        this.lineLayer.setAttribute('y1', y1);
        this.lineLayer.setAttribute('x2', x2);
        this.lineLayer.setAttribute('y2', y2);

        const svgid = this.svgLayer.dataset.layer;
        const lineId = this.lineLayer.dataset.layer;

        KIA.actions.kiaCanvas.creatingElements([
            { 
                id: svgid,
                parent: this.parentKey,
                tagName:this.svgLayer.tagName,
                attributes: { viewBox },
                style: svgStyle,
                children: [],
                instanceof: 'svg',
                stack: [],
            },
            { 
                id: lineId,
                parent: svgid,
                tagName:this.lineLayer.tagName,
                attributes: {
                    stroke: '#d9d9d9',
                    'stroke-width': 2,
                    x1,
                    y1,
                    x2,
                    y2,
                },
                style: {},
                children: [lineId],
                instanceof: 'svg',
                stack: [],
            }
        ]);
        
        if (!this.panning) {            
            const ids = new Set().add(lineId);
            KIA.actions.share.setSelectionIds(ids);
            this.panning = true;
        }
    }
 
    static handlePointerUp(e) {
        props.root.releasePointerCapture(e.pointerId);
        this.panning = false;     

        if (props.isActualMove && this.parentEl) {

            const svgid = this.svgLayer.dataset.layer;
            const lineId = this.lineLayer.dataset.layer;

            const svgElCss = KIA.utils.css.getElementCssProperty(
                this.svgLayer, 
                ['left','top','width','height']
            );

            const width = parseFloat(svgElCss.width);
            const height = parseFloat(svgElCss.height);

            const dx = this.cpsmXY.x - this.cpsdXY.x;
            const dy = this.cpsmXY.y - this.cpsdXY.y;

            const x1 = dx >= 0 ? 0 : width;
            const y1 = dy >= 0 ? 0 : height;
            const x2 = dx >= 0 ? width : 0;
            const y2 = dy >= 0 ? height : 0;

            const newLayerObjs = [
                {
                    id: svgid,
                    parent: this.parentKey,
                    tagName:this.svgLayer.tagName,
                    attributes: {
                        viewBox: `0 0 ${width} ${height}`,
                    },
                    style: {                        
                        ...svgElCss,
                        'background-color': 'transparent',
                    }, 
                    children: [lineId],
                    instanceof: 'svg',
                    stack: [],
                },
                {
                    id: lineId,
                    parent: svgid,
                    tagName:this.lineLayer.tagName,
                    attributes: {
                        stroke: '#d9d9d9',
                        'stroke-width': 2,
                        x1,
                        y1,
                        x2,
                        y2,
                    },
                    style: {}, 
                    children: [],
                    instanceof: 'svg',
                    stack: [],
                },                
            ];   

            KIA.canvasRefMap[svgid] = this.svgLayer;
            KIA.canvasRefMap[lineId] = this.lineLayer;
            KIA.actions.kiaCanvas.createElements(newLayerObjs);
            const ids = new Set().add(lineId);
            KIA.actions.share.setSelectionIds(ids);

        } else {
            this.svgLayer?.remove();
        }   

        this.svgLayer = null;
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