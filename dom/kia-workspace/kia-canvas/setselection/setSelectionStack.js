function Index() {
	const css = KIA.dom.read.getSelectionStackCss();
	const layerEl = KIA.dom.read.getSelectionLayerElement();
	Object.assign(layerEl.style, css);
}

export default Index;