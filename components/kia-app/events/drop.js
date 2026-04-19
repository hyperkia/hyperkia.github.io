
import props from '../utils/props.js';

class Index {

    static handler(e) {
        e.preventDefault();
        if(props.eTarget.closest('[data-page]')) this.uploadFileOnPage(e);        
    }

    static async uploadFileOnPage(e){
    	const file = await KIA.utils.dom.getDropFile(e);
        const acceptedFormats = KIA.state.config.getProp('acceptedFormats');
    	if(!acceptedFormats.includes(file.type)) return;
        if(['image/png','image/jpeg'].includes(file.type)) this.createImg(e, file);
    	if(['image/svg+xml'].includes(file.type)) this.createSvg(e, file);
    }

    static async createImg(e, fileObj){

        const assetObj = {
            id:crypto.randomUUID(),
            name: fileObj.name,
            size: fileObj.size,
            type: fileObj.type, 
            blob: fileObj,
            url: URL.createObjectURL(fileObj),
        };

        KIA.actions.kiaAssetsManagerModal.uploadAssets(assetObj);        

        const layerId = crypto.randomUUID();
        let parentEl = props.eTarget.closest('[data-layer]') || props.eTarget.closest('[data-page]');
        if (!parentEl) return;
        if(!KIA.registry.tags.canHaveChildren(parentEl.nodeName)) {
            parentEl = parentEl.parentElement;
        }
        
        const parentId = parentEl.dataset.layer || parentEl.dataset.page;

 
        const xy = KIA.dom.read.getCanvasElementScaleCoords({e, element: parentEl});
        const imageData = await KIA.utils.dom.fileToDimensionObject(fileObj);      

        const newLayerObj = {
            id: layerId,
            parent: parentId,
            nodeName: 'IMG',
            attributes: {
                src: assetObj.id,
            },                        
            style: {
                top: xy.y+'px',
                left: xy.x+'px',
                width: imageData.width+'px',
                height: imageData.height+'px',
                translate: 'none',
            },            
            stack: [],
            children: [],
        };

        const imgEl = document.createElement('img');
        imgEl.classList.add('canvas-layer', 'imghtml');
        imgEl.setAttribute('data-layer', newLayerObj.id);
        imgEl.setAttribute('draggable', false);
        imgEl.setAttribute('src', assetObj.url);
        Object.assign(imgEl.style, newLayerObj.style);
        parentEl.appendChild(imgEl);
        KIA.canvasRefMap[newLayerObj.id] = imgEl;
        KIA.actions.kiaCanvas.createElement(newLayerObj);
        const ids = new Set().add(newLayerObj.id);
        KIA.actions.share.setSelectionKeys(ids);
    }

    static async createSvg(e, file){
        // const text = await file.text();
        // const svgDoc = new DOMParser().parseFromString(text, "image/svg+xml");
        // const svgEl = KIA.utils.dom.cleanSVGElement(svgDoc.querySelector("svg"));
        // let svgElWidth = svgEl.getAttribute('width');
        // let svgElHeight = svgEl.getAttribute('height');
        // let svgElViewbox = svgEl.getAttribute('viewBox') || '0 0 100 100';

        // let finalWidth, finalHeight;

        // if (KIA.utils.number.isPercentValue(svgElWidth) || KIA.utils.number.isPercentValue(svgElHeight)) {
        //     if (svgElViewbox) {
        //         const [, , vbW, vbH] = svgElViewbox.split(' ').map(Number);
        //         finalWidth = vbW;
        //         finalHeight = vbH;
        //     } else {
        //         finalWidth = 100;
        //         finalHeight = 100;
        //     }
        // } else {
        //     finalWidth = parseInt(svgElWidth) || 100;
        //     finalHeight = parseInt(svgElHeight) || 100;
        // }        

        // const layerId = crypto.randomUUID();
        // let parentEl = props.eTarget.closest('[data-layer]') || props.eTarget.closest('[data-page]');
        // if (!parentEl) return;
        // if(!KIA.registry.tags.canHaveChildren(parentEl.nodeName)) {
        //     parentEl = parentEl.parentElement;
        // }
        
        // const parentKey = parentEl.dataset.layer || parentEl.dataset.page;

        // const xy = KIA.dom.read.getCanvasElementScaleCoords({e, element: parentEl});

        // const newLayerObj = {
        //     id: layerId,
        //     parent: parentKey,
        //     nodeName: "svg",
        //     attrs: {
        //         viewBox: svgElViewbox,
        //     },
        //     type: "uploadsvg",
        //     css: {
        //         visibility: 'visible',
        //         top: xy.y + 'px',
        //         left: xy.x + 'px',
        //         width: svgElWidth + 'px',
        //         height: svgElHeight + 'px',
        //         translate: 'none',
        //         'pointer-events': 'auto',
        //     },
        //     rawSvgInnerHTML: svgEl.innerHTML,
        //     sattrs: {},
        //     scss: {},
        //     stack: {},
        //     assets: {},
        //     save: true,
        // };

        // const domSvgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        // domSvgEl.innerHTML = newLayerObj.rawSvgInnerHTML;
        // domSvgEl.setAttribute('data-layer', newLayerObj.key);    
        // domSvgEl.setAttribute('viewBox', newLayerObj.attrs.viewBox);    
        // domSvgEl.style.cssText = KIA.utils.css.objectToCss(newLayerObj.css);
        // domSvgEl.classList.add('canvas-layer');
        // activePage.appendChild(domSvgEl);

        // KIA.actions.kiaCanvas.createLayer(newLayerObj);
        // const keys = new Set().add(newLayerObj.key);
        // KIA.actions.share.setSelectionKeys(keys);
    }


}

export default Index;