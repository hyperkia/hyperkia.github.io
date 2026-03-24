const selection = new Set();
let layers = null;

function Index() {

    !layers && (layers = KIA.state.layers.map);
    selection.clear();

    KIA.kiaCanvas._qsAll('[data-layer],[data-svgshape]').forEach(el => {

        const rectEl = KIA.utils.dom.getClientRect(el);
        const selectionRect = KIA.kiaCanvas.$id.canvasSelection.getBoundingClientRect();

        const l = layers[el.dataset.layer || el.dataset.svgshape];
        if (l.css.visibility === 'hidden') return;
        if (l.css['pointer-events'] === 'none') return;        

        const isIntersecting = !(
            rectEl.right < selectionRect.left ||
            rectEl.left > selectionRect.right ||
            rectEl.bottom < selectionRect.top ||
            rectEl.top > selectionRect.bottom
        );

        if (isIntersecting) selection.add(el.dataset.layer);

    });

    return selection;
}

export default Index;