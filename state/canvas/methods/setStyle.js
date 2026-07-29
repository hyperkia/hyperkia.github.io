
import props from '../props.js';

function Index(style){
	Object.assign(props.style, style);
	KIA.observer.canvas.observe('setStyle');
}

export default Index;