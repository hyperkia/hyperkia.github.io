function Index() {
    const kiaCanvasRect = KIA.utils.dom.getRect(KIA.kiaCanvas); 

    [...KIA.kiaCanvas.$id.pages.children].forEach((p) => {
        const key = p.dataset.page;
        const pageRect = KIA.utils.dom.getRect(p);
        const pnEl = KIA.kiaCanvas.$id['pageName' + key];
        pnEl.style.left = (pageRect.left - kiaCanvasRect.left + KIA.kiaCanvas.scrollLeft) + 'px';
        pnEl.style.top = (pageRect.top - (pnEl.offsetHeight) - 2 + KIA.kiaCanvas.scrollTop) + 'px';
        pnEl.style.maxWidth = pageRect.width + 'px';
    })
}

export default Index;