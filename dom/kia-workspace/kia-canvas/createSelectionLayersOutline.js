function Index() {
    const calvasLeft = KIA.utils.dom.getRect(KIA.kiaCanvas).left;    
    const layerEls = [...KIA.kiaCanvas._qsAll('.hover-layer')];

    if(KIA.state.ui.selectionKeys?.size) {
        for(const key of KIA.state.ui.selectionKeys) {
            const el = KIA.kiaCanvas._qs(`[data-layer="${key}"]`) || KIA.kiaCanvas._qs(`[data-svgshape="${key}"]`);
            el && (layerEls.push(el));
        }
    }    

    const xScroll = KIA.kiaCanvas.scrollLeft;
    const yScroll = KIA.kiaCanvas.scrollTop;
    let pathD = '';

    layerEls.forEach((lEl)=>{
        const lRect = KIA.utils.dom.getClientRect(lEl);
        lRect.left = lRect.left-calvasLeft-2;
        pathD += `M${lRect.left+xScroll} ${lRect.top+yScroll} H${lRect.left+xScroll + lRect.width} V${lRect.top+yScroll + lRect.height} H${lRect.left+xScroll} Z `;
    })
    KIA.kiaCanvas.$id.activeLayersOutline.setAttribute('d', pathD);
}

export default Index;