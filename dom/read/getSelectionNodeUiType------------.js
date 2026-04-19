
import props from './props.js';

function Index() {	
	const id = KIA.state.ui.getSelectionId();

	if(id === 'canvas') return 'canvas';

	const isPage = KIA.state.pages.map[id];
	if(isPage) return 'page';

	const l = KIA.state.layers.map[id];
	const n = l?.nodeName;

	if(l && l.scss) return 'svg';
	if(l && l.innerText) return 'text';
	if(n === 'img') return 'img';
	if(n === 'document') return 'document';
	if(n === 'audio') return 'audio';
	if(n === 'video') return 'video';
	if(props.SECTION_TAGS.includes(n)) return 'section';
	
	return 'other';
} 

export default Index; 