
import layer from './layer.js';
import page from './page.js';
import canvas from './canvas.js';

function Index(css) {
	const selectionType = KIA.dom.read.getSelectionStoreType();
	switch(selectionType) {
		case 'layers':
			layer(css);
			break;

		case 'pages':
			page(css);
			break;

		case 'canvas':
			canvas(css);
			break;
	}
}

export default Index;