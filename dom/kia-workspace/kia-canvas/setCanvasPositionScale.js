function Index() {
    document.documentElement.style.setProperty('--canvas-zoom', KIA.state.ui.canvasZoom);
    KIA.kiaCanvas.$id.pages.style.transform = `translate(${KIA.state.ui.pagesX}px, ${KIA.state.ui.pagesY}px) scale(${KIA.state.ui.canvasZoom})`;

}

export default Index;