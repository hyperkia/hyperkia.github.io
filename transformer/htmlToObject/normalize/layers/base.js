
import props from '../../utils/props.js';

function Index() {
    const l = props.activeParseLayer.layer;
    const lRect = l.getBoundingClientRect();
    const layerObj = {
        nodeName: l.nodeName.toLowerCase(),
        attrs: {},
        css: {
            top: KIA.utils.number.cleanNumber(lRect.top) + 'px',
            left: KIA.utils.number.cleanNumber(lRect.left) + 'px',
            width: KIA.utils.number.cleanNumber(lRect.width) + 'px',
            height: KIA.utils.number.cleanNumber(lRect.height) + 'px',            
        },
        sattrs: {},
        scss: {},
        stack: [],
    };
    
    let zIndex = KIA.utils.dom.findClosestZIndex(l);
    if(zIndex !== 'auto') layerObj.css['z-index'] = zIndex;

    return layerObj;
}

export default Index;