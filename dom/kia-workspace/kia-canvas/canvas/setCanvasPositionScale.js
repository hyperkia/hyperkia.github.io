function Index() {
    document.documentElement.style.setProperty('--canvas-zoom', KIA.state.ui.getProp('canvasZoom'));
    KIA.kiaCanvas.$id.pages.style.transform = `translate(${KIA.state.ui.getProp('pagesX')}px, ${KIA.state.ui.getProp('pagesY')}px) scale(${KIA.state.ui.getProp('canvasZoom')})`;

}

export default Index;