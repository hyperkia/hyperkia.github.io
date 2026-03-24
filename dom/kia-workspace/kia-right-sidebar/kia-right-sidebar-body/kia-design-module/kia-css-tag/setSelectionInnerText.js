function Index(innerTextObj) {
	const key = KIA.state.ui.selectionKeys.values().next().value;
	const stateInnerText = KIA.state.layers.map[key].innerText;
	const inputEl = KIA.kiaCssTag.$id.tagInnerText;
	if(inputEl.value !== stateInnerText) inputEl.value = stateInnerText;
}

export default Index;