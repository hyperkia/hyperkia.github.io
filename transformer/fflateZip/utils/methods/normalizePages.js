
import { zip, unzipSync, strFromU8 } from '../../library/browser.js';
import props from '../props.js';

function Index(data){
	const pages = {};
	const idsMap = {};

	for( let [pOldId, pObj] of Object.entries(data.pages) ) {
	    const newId = crypto.randomUUID();
	    pObj.id = newId;
	    pages[newId] = pObj;
	    idsMap[pOldId] = newId;
	}

	data.pages = pages;
	Object.assign(data.idsMap, idsMap);
}

export default Index;