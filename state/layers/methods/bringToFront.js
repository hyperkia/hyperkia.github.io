function Index(id) {
    const parentId = KIA.nodesMap[id].parent;
    const parentObj = KIA.nodesMap[parentId];

    const children = parentObj.children;
    const layerIndex = children.indexOf(id);

    if (layerIndex === -1 || layerIndex === children.length - 1) return;
    
    children.splice(layerIndex, 1);
    children.splice(children.length, 0, id);
    
    KIA.observer.layers.observe('updateChildrenOrder');
}

export default Index;