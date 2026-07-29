
import { zip, unzipSync, strFromU8 } from '../../library/browser.js';
import props from '../props.js';

function Index(data){
	const assets = {};
    const idsMap = {};

    for(let [aOldKey, aObj] of Object.entries(data.assets)) {
        const uint8 = this.base64ToUint8Array(aObj.data);
        aObj.blob =  new File([uint8], aObj.name, { type: aObj.type });
        const newId = crypto.randomUUID();
        aObj.id = newId;
        idsMap[aOldKey] = newId;
        delete aObj.data;
        delete aObj.path;
        assets[newId] = aObj;
    };

    Object.assign(data.idsMap, idsMap);
    data.assets = assets;
}

export default Index;