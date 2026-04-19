function Index(ids, detail={}) {

	KIA.state.ui.setSelectionKeys(ids);

	KIA.kiaApp.dispatchEvent(new CustomEvent('selectionChange', {
	  bubbles: true,
	  composed: true,
	  detail,
	}));

}

export default Index;