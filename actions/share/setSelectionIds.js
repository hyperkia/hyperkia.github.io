function Index(ids, detail={}) {
	const oldSelectionId = KIA.state.ui.getSelectionId();
	const newSelectionId = ids.values().next().value;

	KIA.state.ui.setSelectionIds(ids);

	KIA.kiaApp.dispatchEvent(new CustomEvent('selectionChange', {
	  bubbles: true,
	  composed: true,
	  detail,
	}));

	return true;
}

export default Index;