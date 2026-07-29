import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

    static handler(e) {
        if (e.detail.source === 'kiaIconLibrary' && 'iconName' in e.detail) this.iconLibraryIconSelected(e);
    }

    static iconLibraryIconSelected(e) {
        const iconName = e.detail.iconName || props.selectedSvgTag;
        props.selectedSvgTag = iconName;
        if (['svgtag', 'rectsvg', 'linesvg', 'circlesvg', 'ellipsesvg'].includes(iconName)) {
        	props.root.$id.switchSVGtool.value = iconName;
        	props.root.$id.svgshape.dataset.tool = iconName;
            KIA.actions.kiaCanvasTools.changeActiveTool(iconName);
        } else if(iconName) {
            props.moreIcon = KIA.data.icons.getIcon('fontawesome', iconName);
            props.root.$id.svgshape.innerHTML = `
    			<svg xmlns="http://www.w3.org/2000/svg" viewBox="${props.moreIcon.viewBox}">
    				<path d="${props.moreIcon.pathD}"/>
    			</svg>
    		`;
        } else {
            props.root.$id.switchSVGtool.value = 'svgtag';
            props.root.$id.svgshape.dataset.tool = 'svgtag';
            KIA.actions.kiaCanvasTools.changeActiveTool('svgtag');
        }
    }
}

export default Index;