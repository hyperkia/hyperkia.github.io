
import props from '../props.js';

function Index(newLayerObj){
	const id = newLayerObj.id;
	props.map[id].title = newLayerObj.title;
}

export default Index;