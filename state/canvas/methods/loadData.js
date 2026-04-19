

import props from '../props.js';

function Index(data){
	props.projectFonts = data.projectFonts || {};
	if(data.style) props.style = data.style;
	if(data.children) props.children = data.children;
	KIA.observer.canvas.observe('loadData');
	if(data.createdAt) props.createdAt = data.createdAt;
	if(data.updatedAt) props.updatedAt = data.updatedAt;
}

export default Index;