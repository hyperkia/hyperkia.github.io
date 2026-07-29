
function Index(id) {
    const ids = [id];
    function walk(children) {
        (children || []).forEach(id => {
            ids.push(id);
            KIA.nodesMap[id] && walk(KIA.nodesMap[id].children);
        });
    }

    const children = KIA.nodesMap[id].children;
    walk(children);
    return ids;
}

export default Index;