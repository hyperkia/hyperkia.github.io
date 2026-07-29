function Index(){
	const theme = KIA.state.ui.getProp('preferenceTheme');
	const els = KIA.utils.dom.getAllCustomElements();
	els.forEach((el)=>{
		el.dataset.theme = theme;
	})
	document.body.dataset.theme = theme;
	localStorage.setItem('preference-theme', theme);
}

export default Index;