
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {
    
    panning = false;

	static handlePointerDown(e) {
		props.root.setPointerCapture(e.pointerId);
		if (!props.activePage) return;
 
		props.newLayer = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        props.newLayer.setAttribute('data-svgshape', crypto.randomUUID());        
        props.root.$id[`pageSvg${props.activePageKey}`].appendChild(props.newLayer);
        this.cpsdXY = KIA.dom.read.getCanvasPageScaleCoords({e, activePage: props.activePage});

		props.newLayer.setAttribute('x1', this.cpsdXY.x);
		props.newLayer.setAttribute('y1', this.cpsdXY.y);
		props.newLayer.setAttribute('x2', this.cpsdXY.x);
		props.newLayer.setAttribute('y2', this.cpsdXY.y);
        props.newLayer.style.cssText = `stroke: #383838; stroke-width: 2px`;
	}

	static handlePointerMove(e) {
        if (!props.root.hasPointerCapture(e.pointerId)) return false;
        if ((!props.newLayer)) return false;

        this.cpsmXY = KIA.dom.read.getCanvasPageScaleCoords({e, activePage: props.activePage});

        const left = Math.min(this.cpsdXY.x, this.cpsmXY.x);
        const top = Math.min(this.cpsdXY.y, this.cpsmXY.y);
        const width = Math.abs(this.cpsmXY.x - this.cpsdXY.x);

        props.newLayer.setAttribute('x2', this.cpsmXY.x);
        props.newLayer.setAttribute('y2', this.cpsmXY.y);

        const key = props.newLayer.dataset.svgshape;

        KIA.actions.kiaCanvas.createLayer({ 
            key,
            pId: props.activePage.dataset.page,
            nodeName: props.newLayer.nodeName.toLowerCase(),
            type: 'linesvg',
            attrs: {},
            css: {
                width, left, top
            },
            scss: {
                stroke: '#383838',
                'stroke-width': '2px',
            },
            save: false,
            stack: {},
            assets: {},
        });

        
        if(!this.panning) {            
            const keys = new Set().add(key);
            KIA.actions.share.setSelectionKeys(keys);
            this.panning = true;
        }
    }

    static handlePointerUp(e) {
        props.root.releasePointerCapture(e.pointerId);
        this.panning = false;

        if (props.isActualMove && props.activePage) {
            const shapeRect = KIA.utils.dom.getRect(props.newLayer);
            const viewBox = `${shapeRect.left} ${shapeRect.top} ${shapeRect.width} ${shapeRect.height}`;
            const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svgEl.classList.add('canvas-layer');
            svgEl.setAttribute('viewBox', viewBox);
            svgEl.setAttribute('data-layer', props.newLayer.dataset.svgshape);
            svgEl.style.cssText = `top:${shapeRect.top}px;left:${shapeRect.left}px;width:${shapeRect.width}px;height:${shapeRect.height}px;`;
            props.activePage.appendChild(svgEl);
            svgEl.appendChild(props.newLayer);

            // Layer Data
            const newLayerObj = {
                key: svgEl.dataset.layer,
                pId: props.activePageKey,
                nodeName: props.newLayer.nodeName.toLowerCase(),
                attrs: {
                    viewBox
                },
                type: 'linesvg',
                css: {
                    visibility: 'visible',
                    translate: 'none',
                    top: shapeRect.top+'px',
                    left: shapeRect.left+'px',
                    width: shapeRect.width+'px',
                    height: shapeRect.height+'px',
                    'pointer-events': 'auto',
                }, 
                sattrs: {
                    x1: props.newLayer.x1.baseVal.value,                    
                    y1: props.newLayer.y1.baseVal.value,                    
                    x2: props.newLayer.x2.baseVal.value,                    
                    y2: props.newLayer.y2.baseVal.value,                    
                }, 
                scss: {
                    stroke: '#383838',
                    'stroke-width': '2px',
                },
                save: true,
                stack: {},
            assets: {},
            };

            KIA.actions.kiaCanvas.createLayer(newLayerObj);
            const keys = new Set().add(newLayerObj.key);
            KIA.actions.share.setSelectionKeys(keys);

        } else {
            props.newLayer?.remove();
            props.newLayer = null;
        }
    }
}

export default Index;