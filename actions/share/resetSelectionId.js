function Index(){
	KIA.state.ui.resetSelectionId();
	KIA.kiaApp.dispatchEvent(new CustomEvent('selectionChange', {
	  bubbles: true,
	  composed: true,
	  detail: {source: KIA.kiaCanvas},
	}));
}

export default Index;