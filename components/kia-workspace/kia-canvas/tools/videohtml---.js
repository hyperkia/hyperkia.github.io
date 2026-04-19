import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

    panning = false;

    static handlePointerDown(e) {
        props.root.setPointerCapture(e.pointerId);

        if (!props.activePage) return;

        props.newLayer = document.createElement('div');    
        props.newLayer.innerHTML = `
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/9xwazD5SyVg?si=P5IB7SR39PTwuZV8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        `;
        props.newLayer.classList.add('canvas-layer', 'videohtml');
        props.newLayer.setAttribute('data-layer', crypto.randomUUID());
        props.newLayer.setAttribute('draggable', false);        
        props.activePage.append(props.newLayer);

        this.cpsdXY = KIA.dom.read.getCanvasPageScaleCoords({e, activePage: props.activePage});
    }

    static handlePointerMove(e) {

        if (!props.root.hasPointerCapture(e.pointerId)) return false;
        if ((!props.newLayer)) return false;

        this.cpsmXY = KIA.dom.read.getCanvasPageScaleCoords({e, activePage: props.activePage});
        
        const left = parseInt(Math.min(this.cpsdXY.x, this.cpsmXY.x));
        const top = parseInt(Math.min(this.cpsdXY.y, this.cpsmXY.y));
        const width = parseInt(Math.abs(this.cpsmXY.x - this.cpsdXY.x));
        const height = parseInt(Math.abs(this.cpsmXY.y - this.cpsdXY.y));
        
        Object.assign(props.newLayer.style, {
            left: left+'px',
            top: top+'px',
            width: width+'px',
            height: height+'px',
        })

        KIA.actions.kiaCanvas.createLayer({ 
            key: props.newLayer.dataset.layer,
            pId: props.activePage.dataset.page,
            nodeName: 'video',
            attrs: {
                src: 'https://www.youtube.com/embed/9xwazD5SyVg?si=P5IB7SR39PTwuZV8',
            },
            type: 'videohtml',
            css: {
                width, height, left, top
            },
            save: false,
            stack: [],
            assets: {},
            plateform: 'youtube',
        });

        if(!this.panning) {            
            const keys = new Set().add(props.newLayer.dataset.layer);
            KIA.actions.share.setSelectionKeys(keys);
            this.panning = true;
        }
    }
 
    static handlePointerUp(e) {

        props.root.releasePointerCapture(e.pointerId);
        this.panning = false;             

        if (props.isActualMove && props.activePage) {
            const newLayerObj = {
                key: props.newLayer.dataset.layer,
                pId: props.activePage.dataset.page,
                nodeName: 'video',
                attrs: {
                    src: 'https://www.youtube.com/watch?v=9xwazD5SyVg',                
                },
                type: 'videohtml',
                css: {
                    top: props.newLayer.style.top,
                    left: props.newLayer.style.left,
                    width: props.newLayer.style.width,
                    height: props.newLayer.style.height,
                    translate: 'none',                    
                },
                save: true,
                stack: [],
            assets: {},
                plateform: 'youtube',
            };   
            
            KIA.canvasRefMap[id] = props.newLayer; 
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