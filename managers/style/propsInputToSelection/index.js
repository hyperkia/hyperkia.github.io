
import layer from './layer.js';
import page from './page.js';
import canvas from './canvas.js';

function Index(style) {
	const selectionType = KIA.dom.read.getSelectionStoreType();

	switch(selectionType) {
		case 'layers':
			layer(style);
			break;

		case 'pages':
			page(style);
			break;

		case 'canvas':
			canvas(style);
			break;
	}
}

export default Index;