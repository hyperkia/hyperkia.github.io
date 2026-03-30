
import props from '../utils/props.js';

class Index {

    static handler(e) {
        e.preventDefault();
        if(props.eTarget.closest('[data-page]')) this.uploadFileOnPage(e);        
    }

    static async uploadFileOnPage(e){
    	const file = await KIA.utils.dom.getDropFile(e);

        
    	if(!KIA.state.assets.supportFormat.includes(file.type)) return;
        if(['image/png','image/jpeg'].includes(file.type)) this.createImg(e, file);
    	if(['image/svg+xml'].includes(file.type)) this.createSvg(e, file);
    }

    static async createImg(e, fileObj){

        const assetObj = {
            key:crypto.randomUUID(),
            name: fileObj.name,
            size: fileObj.size,
            type: fileObj.type, 
            blob: fileObj,
            url: URL.createObjectURL(fileObj),
        };

        KIA.actions.kiaAssetsManagerModal.uploadAssets(assetObj);        

        const key = crypto.randomUUID();
        const activePage = props.eTarget.closest('[data-page]');
        const xy = KIA.dom.read.getCanvasPageScaleCoords({e, activePage});
        const imageData = await KIA.utils.dom.fileToDimensionObject(fileObj);      

        const newLayerObj = {
            key,
            pId: activePage.dataset.page,
            nodeName: 'img',
            attrs: {},
            type: 'imghtml',
            assets: {
                src: assetObj.key,
            },
            css: {
                visibility: 'visible',
                top: xy.y+'px',
                left: xy.x+'px',
                width: imageData.width+'px',
                height: imageData.height+'px',
                translate: 'none',
                'pointer-events': 'auto',
            },
            save: true,
            stack: [],
        };

        const imgEl = document.createElement('img');
        imgEl.classList.add('canvas-layer', 'imghtml');
        imgEl.setAttribute('data-layer', newLayerObj.key);
        imgEl.setAttribute('draggable', false);
        imgEl.setAttribute('src', assetObj.url);
        Object.assign(imgEl.style, newLayerObj.css);
        activePage.appendChild(imgEl);
        
        KIA.actions.kiaCanvas.createLayer(newLayerObj);
        const keys = new Set().add(newLayerObj.key);
        KIA.actions.share.setSelectionKeys(keys);
    }

    static async createSvg(e, file){
        const text = await file.text();
        const svgDoc = new DOMParser().parseFromString(text, "image/svg+xml");
        const svgEl = KIA.utils.dom.cleanSVGElement(svgDoc.querySelector("svg"));
        let svgElWidth = svgEl.getAttribute('width') || 100;
        let svgElHeight = svgEl.getAttribute('height') || 100;
        let svgElViewbox = svgEl.getAttribute('viewBox') || '0 0 100 100';

        const key = crypto.randomUUID();
        const activePage = props.eTarget.closest('[data-page]');
        const xy = KIA.dom.read.getCanvasPageScaleCoords({e, activePage});

        const newLayerObj = {
          key,
          pId: activePage.dataset.page,
          nodeName: "svg",
          attrs: {
            viewBox: svgElViewbox,
          },
          type: "uploadsvg",
          css: {
            visibility: 'visible',
            top: xy.y+'px',
            left: xy.x+'px',
            width: svgElWidth+'px',
            height: svgElHeight+'px',
            translate: 'none',
            'pointer-events': 'auto',
          },
          rawSvgInnerHTML: svgEl.innerHTML,
          sattrs: {},
          scss: {},
          stack: {},
          assets: {},
          save: true,
        };

        const domSvgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        domSvgEl.innerHTML = newLayerObj.rawSvgInnerHTML;
        domSvgEl.setAttribute('data-layer', newLayerObj.key);    
        domSvgEl.setAttribute('viewBox', newLayerObj.attrs.viewBox);    
        domSvgEl.style.cssText = KIA.utils.css.objectToCss(newLayerObj.css);
        domSvgEl.classList.add('canvas-layer');
        activePage.appendChild(domSvgEl);

        KIA.actions.kiaCanvas.createLayer(newLayerObj);
        const keys = new Set().add(newLayerObj.key);
        KIA.actions.share.setSelectionKeys(keys);
    }


}

export default Index;