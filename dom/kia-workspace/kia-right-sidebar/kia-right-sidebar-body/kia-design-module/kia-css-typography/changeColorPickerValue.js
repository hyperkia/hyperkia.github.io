function Index() {
	const c = KIA.state.ui.colorPicker;
	if(c.target.type === 'css' && c.target.payload.property === 'color') {
		KIA.kiaCssTypography.$id.propColor.value = c.value;
		KIA.kiaCssTypography.$id.propColor._qs('svg').style.color = c.value;
	}
	
}

export default Index;