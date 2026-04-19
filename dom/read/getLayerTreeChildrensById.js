

function Index(id) {
    const layers = KIA.state.layers.getProp('map');
    const ids = [id];

    function walk(children) {
        (children || []).forEach(id => {
            ids.push(id);
            walk(layers[id].children);
        });
    }

    const children = layers[id].children;
    walk(children);
    return ids;
}

export default Index;