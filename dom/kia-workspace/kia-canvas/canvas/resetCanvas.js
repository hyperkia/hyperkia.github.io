function Index(){
	const style = KIA.state.canvas.getProp('style');
	
	const pagesStyle = ['color', 'font-family', 'font-weight', 'font-size', 'line-height', 'letter-spacing', 'text-align', 'text-transform'];
	pagesStyle.forEach((s)=>{
		if(style[s]) KIA.kiaCanvas.$id.pages.style[s] = style[s];	
	})

	if(style['background-color']) KIA.kiaCanvas.style.backgroundColor = style['background-color'];
}

export default Index;