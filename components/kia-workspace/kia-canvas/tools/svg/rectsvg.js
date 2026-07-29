import props from '../../utils/props.js';
import methods from '../../utils/methods.js';

class Index {

    static panning = false;
    static parentEl = null;
    static parentId = null;
    static svgLayer = null;
    static rectLayer = null;
    

    static handlePointerDown(e) {
        props.root.setPointerCapture(e.pointerId);
         

        this.parentEl = props.eTarget.closest('[data-layer]') || props.eTarget.closest('[data-page]');
        if (!this.parentEl) return;
        this.parentEl = KIA.dom.read.getClosestParentAbleHtmlNode(this.parentEl);
        this.parentId = this.parentEl.dataset.layer || this.parentEl.dataset.page;
 
        this.svgLayer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.svgLayer.classList.add('canvas-layer');
        this.svgLayer.setAttribute('data-layer', crypto.randomUUID());
        this.svgLayer.setAttribute('draggable', false);
        this.parentEl.append(this.svgLayer);

        this.rectLayer = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        this.rectLayer.setAttribute('fill', '#d9d9d9');
        this.rectLayer.classList.add('canvas-layer');
        this.rectLayer.setAttribute('data-layer', crypto.randomUUID());
        this.rectLayer.setAttribute('draggable', false);
        this.svgLayer.append(this.rectLayer);

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
        const viewBox = `0 0 ${width} ${height}`;
        
        const svgStyle = {
            left: left+'px',
            top: top+'px',
            width: width+'px',
            height: height+'px',
            'background-color': 'transparent',
        };        
        Object.assign(this.svgLayer.style, svgStyle);
        this.svgLayer.setAttribute('viewBox', viewBox);

        this.rectLayer.setAttribute('x', 0);
        this.rectLayer.setAttribute('y', 0);
        this.rectLayer.setAttribute('width', width);
        this.rectLayer.setAttribute('height', height);

        const svgid = this.svgLayer.dataset.layer;
        const rectId = this.rectLayer.dataset.layer;

        KIA.actions.kiaCanvas.creatingElements([
            { 
                id: svgid,
                parent: this.parentId,
                tagName:this.svgLayer.tagName,
                attributes: {
                    viewBox,
                },
                style: svgStyle,
                children: [rectId],
                instanceof: 'svg',
                stack: [],
            },
            { 
                id: rectId,
                parent: svgid,
                tagName:this.rectLayer.tagName,
                attributes: {
                    fill: '#d9d9d9',
                    x: 0,
                    y: 0,
                    width,
                    height,
                },
                style: {},
                children: [],
                instanceof: 'svg',
                stack: [],
            }
        ]);
        
        if(!this.panning) {            
            const ids = new Set().add(rectId);
            KIA.actions.share.setSelectionIds(ids);
            this.panning = true;
        }
    }
 
    static handlePointerUp(e) {
        props.root.releasePointerCapture(e.pointerId);
        this.panning = false;     

        if (props.isActualMove && this.parentEl) {
            const svgid = this.svgLayer.dataset.layer;
            const rectId = this.rectLayer.dataset.layer;
            const svgElCss = KIA.utils.css.getElementCssProperty(this.svgLayer, ['left','top','width','height']);

            const newElementsObj = [
                {
                    id: svgid,
                    parent: this.parentId,
                    tagName:this.svgLayer.tagName,
                    attributes: {
                        viewBox: `0 0 ${(svgElCss.width).replace('px','')} ${(svgElCss.height).replace('px','')}`,
                    },
                    style: {                        
                        ...svgElCss,
                        'background-color': 'transparent',
                    }, 
                    children: [rectId],
                    instanceof: 'svg',
                    stack: [],
                },
                {
                    id: rectId,
                    parent: svgid,
                    tagName:this.rectLayer.tagName,
                    attributes: {
                        fill: '#d9d9d9',
                        x: 0,
                        y: 0,
                        width: (svgElCss.width).replace('px',''),
                        height: (svgElCss.height).replace('px',''),
                    },
                    style: {}, 
                    children: [],
                    instanceof: 'svg',
                    stack: [],
                },                
            ];   

            KIA.canvasRefMap[svgid] = this.svgLayer;
            KIA.canvasRefMap[rectId] = this.rectLayer;
            KIA.actions.kiaCanvas.createElements(newElementsObj);

            KIA.actions.ui.history.addItem({
                flag: 'createElementSVG',
                selectionId: svgid,
                undo: {
                    parentId: this.parentId,
                    createdIds: [svgid, rectId]
                },
                redo: {                    
                    newElementsObj: structuredClone(newElementsObj),
                }                
            });

            const ids = new Set().add(rectId);
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