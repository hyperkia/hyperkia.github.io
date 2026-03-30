
import props from '../../props/index.js';

function Index() {
    const l = props.activeParseLayer.layer;
    props.activeParseLayer.zIndex++;
    const layerObj = {
        name: l.name,
        attrs: {},
        css: {
            'z-index': props.activeParseLayer.zIndex,
            top: l.top + 'px',
            left: l.left + 'px',
            width: l.right - l.left + 'px',
            height: l.bottom - l.top + 'px',
            visibility: l.hidden ? 'hidden' : 'visible',
            opacity: l.opacity,
        },
        sattrs: {},
        scss: {},
        stack: [],
    };

    return layerObj;
}

export default Index;