
import props from '../props.js';

function Index(ids){
	ids.forEach((id)=>{
		delete props.map[id];
	})
	KIA.observer.layers.observe('deleteLayers');
}

export default Index;