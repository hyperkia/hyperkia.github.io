function Index(layerObj){
    const duplicateNotAllowTagName = KIA.state.config.getProp('svgShapes');
    let parentObj = KIA.nodesMap[layerObj.parent];
    let i = 0;
    while(parentObj) {        
        if(!duplicateNotAllowTagName.includes(parentObj.tagName)) return parentObj;
        parentObj = KIA.nodesMap[parentObj.parent];
        i++;
        if(i === 100) break;
    }
};

export default Index;