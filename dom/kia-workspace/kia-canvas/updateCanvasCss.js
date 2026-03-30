function Index() {
	const css = KIA.state.canvas.css;
	Object.assign(KIA.kiaCanvas.$id.pages.style, css);
	KIA.kiaCanvas.$id.pages.style.backgroundColor = 'transparent';
	if(css['background-color']) KIA.kiaCanvas.style.backgroundColor = css['background-color'];
}

export default Index;
