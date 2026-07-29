import props from '../../utils/props.js';
import methods from '../../utils/methods.js';

class Index {

    panning = false;
    parentEl = null;
    parentKey = null;
    svgLayer = null;
    pathLayer = null;

    points = [];

    static handlePointerDown(e) {
        props.root.setPointerCapture(e.pointerId);

        this.parentEl = props.eTarget.closest('[data-layer]') || props.eTarget.closest('[data-page]');
        if (!this.parentEl) return;
        this.parentEl = KIA.dom.read.getClosestParentAbleHtmlNode(this.parentEl);
        this.parentKey = this.parentEl.dataset.layer || this.parentEl.dataset.page;
 
        // SVG
        this.svgLayer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.svgLayer.classList.add('canvas-layer');
        this.svgLayer.setAttribute('data-layer', crypto.randomUUID());
        this.svgLayer.setAttribute('draggable', false);
        this.parentEl.append(this.svgLayer);

        // PATH
        this.pathLayer = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        this.pathLayer.setAttribute('fill', 'none');
        this.pathLayer.setAttribute('stroke', '#d9d9d9');
        this.pathLayer.setAttribute('stroke-width', 2);
        this.pathLayer.classList.add('canvas-layer');
        this.pathLayer.setAttribute('data-layer', crypto.randomUUID());
        this.pathLayer.setAttribute('draggable', false);
        this.svgLayer.append(this.pathLayer);

        this.points = [];

        const p = KIA.dom.read.getCanvasElementScaleCoords({ e, element: this.parentEl });
        this.points.push(p);
    } 

    static handlePointerMove(e) {

        if (!props.root.hasPointerCapture(e.pointerId)) return false;        
        if (!this.svgLayer) return false;

        const p = KIA.dom.read.getCanvasElementScaleCoords({ e, element: this.parentEl });
        this.points.push(p);

        // 🔥 compute bounding box from all points
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

        for (const pt of this.points) {
            if (pt.x < minX) minX = pt.x;
            if (pt.y < minY) minY = pt.y;
            if (pt.x > maxX) maxX = pt.x;
            if (pt.y > maxY) maxY = pt.y;
        }

        const width = maxX - minX;
        const height = maxY - minY;

        const viewBox = `0 0 ${width} ${height}`;

        const svgStyle = {
            left: minX + 'px',
            top: minY + 'px',
            width: width + 'px',
            height: height + 'px',
        };

        Object.assign(this.svgLayer.style, svgStyle);
        this.svgLayer.setAttribute('viewBox', viewBox);

        // 🔥 build path relative to svg
        let d = '';

        this.points.forEach((pt, i) => {
            const x = pt.x - minX;
            const y = pt.y - minY;

            if (i === 0) {
                d += `M ${x} ${y}`;
            } else {
                d += ` L ${x} ${y}`;
            }
        });

        this.pathLayer.setAttribute('d', d);

        const svgid = this.svgLayer.dataset.layer;
        const pathId = this.pathLayer.dataset.layer;

        KIA.actions.kiaCanvas.creatingElements([
            { 
                id: svgid,
                parent: this.parentKey,
                tagName:this.svgLayer.tagName,
                attributes: { viewBox },
                style: svgStyle,
                children: [pathId],
                instanceof: 'svg',
                stack: [],
            },
            { 
                id: pathId,
                parent: svgid,
                tagName:this.pathLayer.tagName,
                attributes: {
                    d,
                    fill: 'none',
                    stroke: '#d9d9d9',
                    'stroke-width': 2,
                },
                style: {},
                children: [],
                instanceof: 'svg',
                stack: [],
            }
        ]);

        if (!this.panning) {            
            const ids = new Set().add(pathId);
            KIA.actions.share.setSelectionIds(ids);
            this.panning = true;
        }
    }
 
    static handlePointerUp(e) {
        props.root.releasePointerCapture(e.pointerId);
        this.panning = false;

        if (props.isActualMove && this.parentEl) {

            const svgid = this.svgLayer.dataset.layer;
            const pathId = this.pathLayer.dataset.layer;

            const svgElCss = KIA.utils.css.getElementCssProperty(
                this.svgLayer, 
                ['left','top','width','height']
            );

            const d = this.pathLayer.getAttribute('d');

            const newLayerObjs = [
                {
                    id: svgid,
                    parent: this.parentKey,
                    tagName:this.svgLayer.tagName,
                    attributes: {
                        viewBox: `0 0 ${parseFloat(svgElCss.width)} ${parseFloat(svgElCss.height)}`,
                    },
                    style: {                        
                        ...svgElCss,
                    }, 
                    children: [pathId],
                    instanceof: 'svg',
                    stack: [],
                },
                {
                    id: pathId,
                    parent: svgid,
                    tagName:this.pathLayer.tagName,
                    attributes: {
                        d,
                        fill: 'none',
                        stroke: '#d9d9d9',
                        'stroke-width': 2,
                    },
                    style: {}, 
                    children: [],
                    instanceof: 'svg',
                    stack: [],
                },                
            ];   

            KIA.actions.kiaCanvas.createElements(newLayerObjs);

            const ids = new Set().add(pathId);
            KIA.actions.share.setSelectionIds(ids);

        } else {
            this.svgLayer?.remove();
            this.svgLayer = null;
        }        
    }

    static handlePointerCancel(){
        this.svgLayer?.remove();
        this.svgLayer = null;
        this.panning = false;
        this.parentEl = null;
    }
}

export default Index;