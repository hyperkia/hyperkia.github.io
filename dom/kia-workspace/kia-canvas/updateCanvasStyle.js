function Index() {
	const style = KIA.state.canvas.getProp('style');
	Object.assign(KIA.kiaCanvas.$id.pages.style, style);
	KIA.kiaCanvas.$id.pages.style.backgroundColor = 'transparent';
	if(style['background-color']) KIA.kiaCanvas.style.backgroundColor = style['background-color'];
}

export default Index;
