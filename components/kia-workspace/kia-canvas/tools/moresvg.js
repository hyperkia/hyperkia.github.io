
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

    panning = false;
    key = '';

	static handlePointerDown(e) {
		props.root.setPointerCapture(e.pointerId);
		if (!props.activePage) return;

        props.newLayer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');     
        props.newLayer.setAttribute('viewBox', props.moreIcon.viewBox);
        props.newLayer.setAttribute('preserveAspectRatio', 'none');
		this.pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        this.pathEl.setAttribute('fill', '#d9d9d9');
        this.pathEl.setAttribute('d', props.moreIcon.pathD);
        props.newLayer.appendChild(this.pathEl);
        this.key = crypto.randomUUID();
        this.pathEl.setAttribute('data-svgshape', this.key);        
        props.newLayer.setAttribute('data-layer', this.key);        
        props.newLayer.classList.add('canvas-layer');
		props.activePage.appendChild(props.newLayer);
        this.cpsdXY = KIA.dom.read.getCanvasPageScaleCoords({e, activePage: props.activePage});
	}

	static handlePointerMove(e) {
        if (!props.root.hasPointerCapture(e.pointerId)) return false;
        if ((!props.newLayer)) return false;

        this.cpsmXY = KIA.dom.read.getCanvasPageScaleCoords({e, activePage: props.activePage});

        const left = Math.min(this.cpsdXY.x, this.cpsmXY.x);
        const top = Math.min(this.cpsdXY.y, this.cpsmXY.y);
        const width = Math.abs(this.cpsmXY.x - this.cpsdXY.x);
        const height = Math.abs(this.cpsmXY.y - this.cpsdXY.y);

        props.newLayer.style.left = left+'px';
        props.newLayer.style.top = top+'px';
        props.newLayer.style.width = width+'px';
        props.newLayer.style.height = height+'px';        

        KIA.actions.kiaCanvas.createLayer({ 
            key: this.key,
            pId: props.activePage.dataset.page,
            nodeName: props.newLayer.nodeName.toLowerCase(),
            attrs: {},
            type: 'moresvg',
            css: {
                width, height, left, top
            },
            sattrs: {},
            scss: {},
            save: false,
            stack: {},
            assets: {},
        });

        
        if(!this.panning) {            
            const keys = new Set().add(this.key);
            KIA.actions.share.setSelectionKeys(keys);
            this.panning = true;
        }
    }

    static handlePointerUp(e) {

        props.root.releasePointerCapture(e.pointerId);
        this.panning = false;

        if (props.isActualMove && props.activePage) {

            // Layer Data
            const newLayerObj = {
                key: this.key,
                pId: props.activePageKey,
                nodeName: 'path',
                attrs: {
                    viewBox: props.moreIcon.viewBox
                },
                type: 'moresvg',
                css: {
                    visibility: 'visible',
                    translate: 'none',
                    top: props.newLayer.style.top,
                    left: props.newLayer.style.left,
                    width: props.newLayer.style.width,
                    height: props.newLayer.style.height,                    
                    'pointer-events': 'auto',
                }, 
                sattrs: {
                    d: this.pathEl.getAttribute('d'),
                    fill: '#d9d9d9',
                }, 
                scss: {
                    
                },
                save: true,
                stack: {},
            assets: {},
            };

            KIA.actions.kiaCanvas.createLayer(newLayerObj);
            const keys = new Set().add(this.key);
            KIA.actions.share.setSelectionKeys(keys);
            
        } else {
            props.newLayer?.remove();
            props.newLayer = null;
        }
    }
} 

export default Index;