function Index() {
    const calvasLeft = KIA.utils.dom.getRect(KIA.kiaCanvas).left;    
    const layerEls = [...KIA.kiaCanvas._qsAll('.hover-layer')];

    if(KIA.state.ui.getSelectionId()?.size) {
        for(const key of KIA.state.ui.getSelectionId()) {
            const el = KIA.kiaCanvas._qs(`[data-layer="${key}"]`);
            el && (layerEls.push(el));
        }
    }    

    KIA.kiaCanvas.$id.activeLayersOutline.dataset.selection = layerEls.length;
 
    const xScroll = KIA.kiaCanvas.scrollLeft;
    const yScroll = KIA.kiaCanvas.scrollTop;
    let pathD = '';

    layerEls.forEach((lEl)=>{
        const lRect = KIA.utils.dom.getClientRect(lEl);
        lRect.left = lRect.left-calvasLeft-2;
        pathD += `M${lRect.left+xScroll} ${lRect.top+yScroll} H${lRect.left+xScroll + lRect.width} V${lRect.top+yScroll + lRect.height} H${lRect.left+xScroll} Z `;
    })
    KIA.kiaCanvas.$id.activeLayersOutline.setAttribute('d', pathD);
    KIA.kiaCanvas.$id.activeLayersOutlineMask.setAttribute('d', pathD);

}

export default Index;