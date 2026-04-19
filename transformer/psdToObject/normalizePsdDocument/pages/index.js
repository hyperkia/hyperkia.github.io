
import props from '../../props/index.js';

function Index(pageKey) {
	const pages = {};
	const key = crypto.randomUUID();
	const pageObj = {
		key,
		name: props.file.name.split('.').slice(0, -1).join('.'),
		css: {
			width: props.psdRaw.width+'px',
			height: props.psdRaw.height+'px',
			'background-color': '#ffffffff',
			'pointer-events': 'auto',
            visibility: 'visible',
            order: Object.keys(KIA.state.pages.getProp('map')).length+1,
		},			
        layers: [],
		source: 'psd',
	};
	pages[key] = pageObj;

	return pages;
}

export default Index;