import props from '../../utils/props.js';
import methods from '../../utils/methods.js';

class Index {
    panning = false;
 
    static handlePointerDown(e) {
        props.root.setPointerCapture(e.pointerId);

        if (!props.activePage) return;

        props.newLayer = document.createElement('div');    
        props.newLayer.innerHTML = `
            <iframe src="/assets/sample-local-pdf.pdf" loading="lazy"></iframe>
        `;
        props.newLayer.classList.add('canvas-layer', 'documenthtml');
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
            tagName: props.newLayer.tagName,
            attrs: {
                src: 'https://pdfobject.com/pdf/sample.pdf',
            },
            type: 'documenthtml',
            css: {
                width, height, left, top
            },
            save: false,
            stack: [],
            assets: {},
            extension: 'pdf',

        });
        
        if(!this.panning) {  
            const keys = new Set().add(props.newLayer.dataset.layer);
            KIA.actions.share.setSelectionIds(keys);
            this.panning = true;
        }
    }
 
    static handlePointerUp(e) {

        props.root.releasePointerCapture(e.pointerId);
        this.panning = false;            

        if (props.isActualMove && this.parentEl) {
            const newLayerObj = {
                key: props.newLayer.dataset.layer,
                pId: props.activePage.dataset.page,
                tagName: 'document',
                attrs: {
                    src: 'https://pdfobject.com/pdf/sample.pdf',
                },
                type: 'documenthtml',
                style: {                    
                    top: props.newLayer.style.top,
                    left: props.newLayer.style.left,
                    width: props.newLayer.style.width,
                    height: props.newLayer.style.height,
                },
                save: true,
                stack: [],
            assets: {},
                extension: 'pdf',
            };    

            KIA.actions.kiaCanvas.createLayer(newLayerObj);
            const keys = new Set().add(newLayerObj.key);
            KIA.actions.share.setSelectionIds(keys);
        } else {
            props.newLayer?.remove();
            props.newLayer = null;
        }
    }

    static handlePointerCancel(){}
}

export default Index;