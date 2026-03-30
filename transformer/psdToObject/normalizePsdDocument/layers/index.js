import props from '../../props/index.js';
import base from './base.js';
import type from './types/index.js';


function parseLayer() {    
    const layerObj = base();
    layerObj.pId = props.activeParseLayer.pageKey;    

    const parseData = type();
    if (parseData?.css) Object.assign(layerObj.css, parseData.css);
    if (parseData?.attrs) Object.assign(layerObj.attrs, parseData.attrs);

    if (parseData?.scss) Object.assign(layerObj.scss, parseData.scss);
    if (parseData?.sattrs) Object.assign(layerObj.sattrs, parseData.sattrs);

    if (parseData?.nodeName) layerObj.nodeName = parseData.nodeName;
    if (parseData?.innerText) layerObj.innerText = parseData.innerText;    
    if (parseData?.canvas) layerObj.canvas = parseData.canvas;    
    if (parseData?.clipBaseLayer) layerObj.clipBaseLayer = parseData.clipBaseLayer;
    if (parseData?.clipSiblingLayer) layerObj.clipSiblingLayer = parseData.clipSiblingLayer;
    if (parseData?.gradient) layerObj.gradient = parseData.gradient;

    return layerObj;
}

function setClipBaseLayer(children, j) {
    for(j; j<children.length; j--) {
        if(!children[j].clipping) {
            props.activeParseLayer.clipBaseLayer = children[j];
            break;
        }
    }
}

function setClipSiblingLayers(children, j){
    for(j; j<=children.length; j++) {        
        if(children[j]) props.activeParseLayer.clipSiblingLayer.push(children[j]);
    }
}

async function layerImgCanvasToBlob(lObj){
    // Main
    if (lObj.canvas) {
        lObj.blob = await KIA.utils.dom.canvasToBlob(lObj.canvas);
        delete lObj.canvas;
    }

    // clipBaseLayer
    if (lObj.clipBaseLayer) {
        for (const bl of lObj.clipBaseLayer) {
            if (!bl.canvas) continue;

            bl.blob = await KIA.utils.dom.canvasToBlob(bl.canvas);
            delete bl.canvas;
        }
    }

    // clipSiblingLayer
    if (lObj.clipSiblingLayer) {
        for (const csl of lObj.clipSiblingLayer) {
            if (!csl.canvas) continue;

            csl.blob = await KIA.utils.dom.canvasToBlob(csl.canvas);
            delete csl.canvas;
        }
    }
}



async function Index(pageKey) {
    props.activeParseLayer.pageKey = pageKey;
    props.activeParseLayer.zIndex = 0;

    const layers = {};

    async function parseChildren(children) {
        for (let j = 0; j < children.length; j++) {
            const l = children[j];

            if (!l.clipping && children[j + 1]?.clipping) continue;
            if (l.clipping && children[j - 1]?.clipping) continue;

            if (!l.children) {
                if (l.clipping) setClipBaseLayer(children, j);
                props.activeParseLayer.clipSiblingLayer.length = 0;
                if (l.clipping) setClipSiblingLayers(children, j);
                props.activeParseLayer.layer = l;

                const key = crypto.randomUUID();
                const layerObj = parseLayer();

                await layerImgCanvasToBlob(layerObj);

                layerObj.key = key;
                layers[key] = layerObj;
            }

            if (l.children) {
                await parseChildren(l.children);
            }
        }
    }

    await parseChildren(props.psdRaw.children);

    return layers;
}






export default Index;