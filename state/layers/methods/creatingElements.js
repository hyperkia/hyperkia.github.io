
import props from '../props.js';

function Index(newLayerObjs){
	newLayerObjs.forEach((lObj)=>{
		props.map[lObj.id] = lObj;
	})
}

export default Index;