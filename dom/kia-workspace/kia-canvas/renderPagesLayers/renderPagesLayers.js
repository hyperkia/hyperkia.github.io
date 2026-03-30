import layerUi from './layerUi/index.js';

function Index() {
    const pages = KIA.state.pages.map;
    const layers = KIA.state.layers.map;
    const html = {};
    const css = [];
    const renderPagesKey = [...KIA.kiaCanvas._qsAll('[data-render="true"]')].map(p => p.dataset.page);

    for (let pk in pages) {
        if (renderPagesKey.includes(pk)) continue;

        html[pk] = [];
        const pLayers = pages[pk].layers;
        pLayers.forEach((lk) => {
            const l = layers[lk];
            if(!l) return;
            
            // HTML
            const n = l.nodeName;
            if (['audio', 'document', 'img', 'path', 'video', 'rect', 'circle', 'line', 'ellipse', 'svg'].includes(n)) {
                html[pk].push(layerUi[n](l));
            } else if (l.innerText) {
                html[pk].push(layerUi.text(l));
            } else {
                html[pk].push(layerUi.fallBack(l));
            }

            // HTML CSS            
            const cssStr = KIA.utils.css.objectToCss(l.css);
            css.push(`[data-layer="${l.key}"]{${cssStr}}`);

            // SVG CSS
            if (l.scss) {
                const shapeCssStr = KIA.utils.css.objectToCss(l.scss);
                css.push(`[data-svgshape="${l.key}"]{${shapeCssStr}}`);
            }
        })
    }

    KIA.kiaCanvas.$id.style.innerHTML += css.join('');

    const orderedPageKeys = KIA.state.canvas.pagesOrder;

    let i = 0;

    function render() {
        if (KIA.kiaCanvas.$id.pages.querySelectorAll('*').length > 5000) console.error('Layers Limit Exceeds');
        if (orderedPageKeys[i]) {
            const pk = orderedPageKeys[i];
            const pageEl = KIA.kiaCanvas.$id['page' + pk];
            if (pageEl) {
                requestAnimationFrame(() => {
                    if (!html[pk]) return;
                    pageEl.insertAdjacentHTML('beforeend', html[pk].join(''));
                    pageEl.dataset.render = true;
                })
            }
            i++;
            setTimeout(render, 1000);
        }
    }
    render();
}

export default Index;