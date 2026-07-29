import props from '../../utils/props.js';
import methods from '../../utils/methods.js';

class Index {

    static panning = false;
    static parentEl = null;
    static parentKey = null;
    static svgLayer = null;
    static ellipseLayer = null;
    

    static handlePointerDown(e) {
        props.root.setPointerCapture(e.pointerId);
        
        this.parentEl = props.eTarget.closest('[data-layer]') || props.eTarget.closest('[data-page]');
        if (!this.parentEl) return;
        this.parentEl = KIA.dom.read.getClosestParentAbleHtmlNode(this.parentEl);
        this.parentKey = this.parentEl.dataset.layer || this.parentEl.dataset.page;
 
        this.svgLayer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.svgLayer.setAttribute('preserveAspectRatio', 'none');
        this.svgLayer.classList.add('canvas-layer');
        this.svgLayer.setAttribute('data-layer', crypto.randomUUID());
        this.svgLayer.setAttribute('draggable', false);
        this.parentEl.append(this.svgLayer);

        this.ellipseLayer = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        this.ellipseLayer.setAttribute('fill', '#d9d9d9');
        this.ellipseLayer.classList.add('canvas-layer');
        this.ellipseLayer.setAttribute('data-layer', crypto.randomUUID());
        this.ellipseLayer.setAttribute('draggable', false);
        this.svgLayer.append(this.ellipseLayer);

        this.cpsdXY = KIA.dom.read.getCanvasElementScaleCoords({ e, element: this.parentEl });
    } 

    static handlePointerMove(e) {

        if (!props.root.hasPointerCapture(e.pointerId)) return false;        
        if (!this.svgLayer) return false;

        this.cpsmXY = KIA.dom.read.getCanvasElementScaleCoords({ e, element: this.parentEl });
        
        const left = Math.min(this.cpsdXY.x, this.cpsmXY.x);
        const top = Math.min(this.cpsdXY.y, this.cpsmXY.y);
        const width = Math.abs(this.cpsmXY.x - this.cpsdXY.x);
        const height = Math.abs(this.cpsmXY.y - this.cpsdXY.y);

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

        const cx = width / 2;
        const cy = height / 2;
        const rx = width / 2;
        const ry = height / 2;

        this.ellipseLayer.setAttribute('cx', cx);
        this.ellipseLayer.setAttribute('cy', cy);
        this.ellipseLayer.setAttribute('rx', rx);
        this.ellipseLayer.setAttribute('ry', ry);

        const svgid = this.svgLayer.dataset.layer;
        const ellipseId = this.ellipseLayer.dataset.layer;

        KIA.actions.kiaCanvas.creatingElements([
            { 
                id: svgid,
                parent: this.parentKey,
                tagName: this.svgLayer.tagName,
                attributes: { viewBox },
                style: svgStyle,
                children: [ellipseId],
                instanceof: 'svg',
                stack: [],
            },
            { 
                id: ellipseId,
                parent: svgid,
                tagName: this.ellipseLayer.tagName,
                attributes: {
                    fill: '#d9d9d9',
                    cx,
                    cy,
                    rx,
                    ry,
                },
                style: {},
                children: [],
                instanceof: 'svg',
                stack: [],
            }
        ]);
        
        if (!this.panning) {            
            const ids = new Set().add(ellipseId);
            KIA.actions.share.setSelectionIds(ids);
            this.panning = true;
        }
    }
 
    static handlePointerUp(e) {
        props.root.releasePointerCapture(e.pointerId);
        this.panning = false;     

        if (props.isActualMove && this.parentEl) {

            const svgid = this.svgLayer.dataset.layer;
            const ellipseId = this.ellipseLayer.dataset.layer;

            const svgElCss = KIA.utils.css.getElementCssProperty(
                this.svgLayer, 
                ['left','top','width','height']
            );

            const width = parseFloat(svgElCss.width);
            const height = parseFloat(svgElCss.height);

            const cx = width / 2;
            const cy = height / 2;
            const rx = width / 2;
            const ry = height / 2;

            const newLayerObjs = [
                {
                    id: svgid,
                    parent: this.parentKey,
                    tagName: this.svgLayer.tagName,
                    attributes: {
                        viewBox: `0 0 ${width} ${height}`,
                    },
                    style: {                        
                        ...svgElCss,
                        'background-color': 'transparent',
                    }, 
                    children: [ellipseId],
                    instanceof: 'svg',
                    stack: [],
                },
                {
                    id: ellipseId,
                    parent: svgid,
                    tagName: this.ellipseLayer.tagName,
                    attributes: {
                        fill: '#d9d9d9',
                        cx,
                        cy,
                        rx,
                        ry,
                    },
                    style: {}, 
                    children: [],
                    instanceof: 'svg',
                    stack: [],
                },                
            ];   

            KIA.canvasRefMap[svgid] = this.svgLayer;
            KIA.canvasRefMap[ellipseId] = this.ellipseLayer;
            KIA.actions.kiaCanvas.createElements(newLayerObjs);

            const ids = new Set().add(ellipseId);
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