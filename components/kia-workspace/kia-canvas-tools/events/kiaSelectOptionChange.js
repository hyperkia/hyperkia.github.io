
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

	static handler(e){		
		if(e.detail.source.matches('.dropdown-tools-select')) this.dropdownToolChange(e);		
	}

	static dropdownToolChange(e){
		let tool = e.detail.source.value;		
		KIA.actions.kiaCanvasTools.changeActiveTool(tool);
		if(tool === 'moresvg') KIA.actions.kiaModals.openModal('kiaIconLibraryModal');
		if(props.eTarget.matches('[data-name="switchSVGtool"]') && tool!=='moresvg') props.selectedSvgTag = tool;
	}

}

export default Index;