
import { zip, unzipSync, strFromU8 } from '../../library/browser.js';
import props from '../props.js';

function Index(data){
	const idsMap = data.idsMap;

    // Canvas
    const canvasChildren = data.canvas.children;
    canvasChildren.forEach((oldId,i)=>{
        canvasChildren[i] = data.idsMap[oldId];
    });

    // Page
    for(const [pId, pObj] of Object.entries(data.pages)) {
        const pageChildren = pObj.children;
        pageChildren.forEach((oldId,i)=>{
            pageChildren[i] = data.idsMap[oldId];
        });
    }
    
    // Layer
    for(const [lId, lObj] of Object.entries(data.layers)) {
        const pageChildren = lObj.children;
        pageChildren.forEach((oldId,i)=>{
            pageChildren[i] = data.idsMap[oldId];
        });
        lObj.parent = data.idsMap[lObj.parent]; // Layer Parent
    }
}

export default Index;