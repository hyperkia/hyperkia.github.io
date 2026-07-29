
import { zip, unzipSync, strFromU8 } from '../../library/browser.js';
import props from '../props.js';

function Index(data){
	const layers = {};
    const idsMap = {};

    for( let [lOldId, lObj] of Object.entries(data.layers) ) {

        // Layers
        const newId = crypto.randomUUID();
        lObj.id = newId;            
        layers[newId] = lObj;
        idsMap[lOldId] = newId;
    };

    Object.assign(data.idsMap, idsMap);
    
    data.layers = layers;
}

export default Index;