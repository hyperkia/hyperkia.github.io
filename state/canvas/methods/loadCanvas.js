

import props from '../props.js';

function Index(data){
	props.projectFonts = data.projectFonts || structuredClone(KIA.state.config.getProp('defaultProjectFont'));
	if(data.style) props.style = data.style;
	if(data.children) props.children = data.children;
	if(data.dataStructure) props.dataStructure = data.dataStructure;
	if(data.createdAt) props.createdAt = data.createdAt;
	if(data.updatedAt) props.updatedAt = data.updatedAt;
	KIA.observer.canvas.observe('loadCanvas');
}

export default Index;