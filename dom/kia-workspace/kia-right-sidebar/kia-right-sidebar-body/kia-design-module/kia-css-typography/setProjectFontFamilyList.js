function Index() {
	const fonts = KIA.state.ui.fonts;
	const selectEl = KIA.kiaCssTypography.$id.fontFamilySelect;
	const optionsEl = selectEl._qs('.select-options');	
	const summaryEl = selectEl._qs('summary');	
	const families = Object.keys(fonts);
	let html = '';
	families.forEach(f => html += `<span class="select-option" value="${f}">${f}</span>`);
	optionsEl.innerHTML = html;
	selectEl.value = families[0];
	const cssImportUrl = KIA.utils.string.mapGoogleFontsNameToCssImportUrl(families);
	KIA.kiaCssTypography.$id.importFontsStyleEl.innerText = cssImportUrl;

}

export default Index;