function Index(controlEl) {
	const d = controlEl.dataset;
	return {
		[d.prop]: controlEl.value+(d.unit||'')
	}
}

export default Index;