
import props from '../../utils/props.js';

function Index(){
	const pages = {};
	const pageObject = structuredClone(KIA.state.config.getProp('newPageObject'));
	pageObject.source = 'psd';
	pageObject.id = props.rawPsd.hyperkiaId;
	pageObject.children = props.rawPsd.hyperkiaChildren;
	pageObject.title = props.uploadedFile.name.split('.').slice(0, -1).join('.');
	pageObject.createdAt = Date.now();
	Object.assign(pageObject.style, {
		width: props.rawPsd.width+'px',
		height: props.rawPsd.height+'px',		
	});	
	pages[pageObject.id] = pageObject;
	props.nodesObj[pageObject.id] = pageObject;
	props.parse.pages = pages;
	props.parse.canvas.children.push(pageObject.id);
}

export default Index;