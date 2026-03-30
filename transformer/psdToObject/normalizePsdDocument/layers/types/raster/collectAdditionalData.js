import props from '../../../../props/index.js';
import methods from '../methods/index.js';

function Index(obj) {
    const l = props.activeParseLayer.layer;


    // Baselayer
    if (l.clipping) {
        obj.clipBaseLayer = [];
        const mostBound = {
            top: [],
            left: [],
            right: [],
            bottom: [],
        };
        const baseLayer = props.activeParseLayer.clipBaseLayer.children || [props.activeParseLayer.clipBaseLayer];
        baseLayer.forEach((bl) => {
            mostBound.top.push(bl.top);
            mostBound.left.push(bl.left);
            mostBound.right.push(bl.right);
            mostBound.bottom.push(bl.bottom);
        });

        obj.css.left = Math.min(...mostBound.left);
        obj.css.top = Math.min(...mostBound.top);
        obj.css.width = Math.max(...mostBound.right) - obj.css.left + 'px';
        obj.css.height = Math.max(...mostBound.bottom) - obj.css.top + 'px';

        baseLayer.forEach((bl)=>{            
            const blData = {
                nodeName: 'img',
                name: bl.name,
                canvas: bl.canvas,
                left: (bl.left - obj.css.left),
                top: (bl.top - obj.css.top),
                width: bl.right-bl.left,
                height: bl.bottom-bl.top,
            };

            if(bl.vectorFill?.color) blData.fill = KIA.utils.css.rgbaObjectToCss(bl.vectorFill.color);
            obj.clipBaseLayer.push(blData);         
        })

        obj.css.left += 'px';
        obj.css.top += 'px';
    }

    // Clipping	
    if(l.clipping) {
        obj.clipSiblingLayer = [];
        const clipSiblingLayer = [];
        props.activeParseLayer.clipSiblingLayer.forEach((csl)=>{
            if(!csl.children) clipSiblingLayer.push(csl);
        });
        
        clipSiblingLayer.forEach((scl)=>{
            const sclData = {
                nodeName: 'img',
                name: scl.name,
                canvas: scl.canvas,
                left: (scl.left - obj.css.left.replace('px','')),
                top: (scl.top - obj.css.top.replace('px','')),
                width: scl.canvas.width,
                height: scl.canvas.height,
            };                      
            obj.clipSiblingLayer.push(sclData);
        })      
    }

}

export default Index;