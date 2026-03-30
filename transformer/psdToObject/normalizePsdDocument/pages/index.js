
import props from '../../props/index.js';

function Index(pageKey) {
	const pages = {};
	const pId = crypto.randomUUID();
	const pageObj = {
		key: pId,
		name: props.file.name.split('.').slice(0, -1).join('.'),
		css: {
			width: props.psdRaw.width+'px',
			height: props.psdRaw.height+'px',
			'background-color': '#ffffffff',
			'pointer-events': 'auto',
            visibility: 'visible',
            order: Object.keys(KIA.state.pages.map).length+1,
		},			
        layers: [],
		source: 'psd',
	};
	pages[pId] = pageObj;

	return pages;
}

export default Index;