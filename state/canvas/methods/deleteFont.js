
import props from '../props.js';

function Index(name){
	delete props.projectFonts[name];
	KIA.observer.canvas.observe('changeProjectFonts');
}

export default Index;