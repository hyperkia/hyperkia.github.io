function Index() {
	const fonts = KIA.state.canvas.projectFonts;
	if(!fonts) return;
	const selectedFamily = KIA.kiaCssTypography.$id.fontFamilySelect.value;
	const selectedFamilyData = fonts[selectedFamily];
	if(! selectedFamilyData) return;
	const selectEl = KIA.kiaCssTypography.$id.fontWeightSelect;	
	selectEl.dataset.iweights = selectedFamilyData.i;
	selectEl.dataset.nweights = selectedFamilyData.n;

	let selectedWeight = '';

	let iw = selectedFamilyData.n;	
	if(iw) {
		if(!selectedWeight && iw.includes('4')) selectedWeight = 4;
		if(!selectedWeight && iw.includes('5')) selectedWeight = 5;
		if(!selectedWeight && iw.includes('7')) selectedWeight = 7;
		if(!selectedWeight) selectedWeight = iw[0];
		selectedWeight += '00-italic';
	}

	let nw = selectedFamilyData.n;	
	if(nw) {
		selectedWeight = '';
		if(!selectedWeight && nw.includes('4')) selectedWeight = 4;
		if(!selectedWeight && nw.includes('5')) selectedWeight = 5;
		if(!selectedWeight && nw.includes('7')) selectedWeight = 7;
		if(!selectedWeight) selectedWeight = nw[0];
		selectedWeight += '00';
	}

	selectEl.value = selectedWeight;
}

export default Index;