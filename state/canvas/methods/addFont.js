
import props from '../props.js';

function Index(fonts){
	for(let f in fonts) props.projectFonts[f] = fonts[f];
	KIA.observer.canvas.observe('changeProjectFonts');
}

export default Index;