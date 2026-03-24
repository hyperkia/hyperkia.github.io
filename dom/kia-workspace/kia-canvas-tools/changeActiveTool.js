

const htmlTools = ['sectionhtml','imghtml','audiohtml','videohtml','documenthtml'];
const svgTools = ['rectsvg','linesvg','circlesvg','ellipsesvg','pathsvg','moresvg'];

function Index() {

	const tool = KIA.state.ui.activeTool;
	KIA.kiaCanvasTools._qs('.activetool').classList.remove('activetool');	

	let dropdownEl = null;
	if(htmlTools.includes(tool)) {
		dropdownEl = 'htmltag'
	} else if (svgTools.includes(tool)) {
		dropdownEl = 'svgshape';
	}

	if(dropdownEl) {
		KIA.kiaCanvasTools.$id[dropdownEl].classList.add('activetool')
		KIA.kiaCanvasTools.$id[dropdownEl].dataset.tool = tool;
	} else {
		KIA.kiaCanvasTools._qs(`[data-tool="${tool}"]`).classList.add('activetool');
	}
	
}

export default Index;