
import props from '../props.js';

function Index(newLayerObjs){
	newLayerObjs.forEach((lObj)=>{
		props.map[lObj.id] = lObj;
		KIA.nodesMap[lObj.id] = lObj;
	})
}

export default Index;