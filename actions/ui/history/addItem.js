
let debounceTimeout = null;

function Index(newItem){
	clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        KIA.state.history.addItem(newItem);
    }, 150);
}

export default Index;