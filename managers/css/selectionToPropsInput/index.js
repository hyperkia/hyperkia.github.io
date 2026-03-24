
import layers from './layers.js';
import pages from './pages.js';
import canvas from './canvas.js';

function Index() {
	
	const selectionType = KIA.dom.read.getSelectionStoreType();

	switch(selectionType) {
		case 'layers':
			layers();
			break;

		case 'pages':
			pages();
			break;

		case 'canvas':
			canvas();
			break;
	}
}

export default Index;