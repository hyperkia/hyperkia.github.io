
import props from '../../../utils/props.js';
import methods from '../../../utils/methods/index.js';

function getParentXYValue(obj){
	let xy = null;
	if(obj.tagName === 'g') {
		xy = obj.attributes.transform.split('\(')[1].replace(')','').split(',');
	} else if(methods.isAncestor(obj,'svg')) {
		xy = [obj.attributes.x, obj.attributes.y];
	} else if(obj.style.left) {
		xy = [parseInt(obj.style.left), parseInt(obj.style.top)];
	}

	return xy;
}

function getObjXY(obj){
	let xy = [];
	if(Object.hasOwn(obj.attributes, "x")) {
		xy = [obj.attributes.x,obj.attributes.y];
	} else if(obj.style.left) {
		xy = [parseInt(obj.style.left),parseInt(obj.style.top)];
	} else if(obj.attributes.transform) {		
		xy = obj.attributes.transform.split('\(')[1].replace(')','').split(',');
	}

	return xy;
}

function Index(){
	for(const [lId, lObj] of Object.entries(props.parse.layers)) {		
		const parentObj = props.nodesObj[lObj.parent];
		if(parentObj.instanceof === "document") continue;		
		
		const xy = getObjXY(lObj);
		const parentXY = getParentXYValue(parentObj);

		// if(lObj.title === 'map-123') {
		// 	console.log(lObj);
		// 	console.log(parentXY);
		// 	console.log(xy);
		// }


		if(methods.isAncestor(lObj, 'svg')) {
			if(Object.hasOwn(lObj.attributes, "x")) {				
				lObj.attributes.x = xy[0] - parentXY[0];
				lObj.attributes.y = xy[1] - parentXY[1];
			} else if(lObj.attributes.transform) {
				lObj.attributes.transform = `translate(${xy[0] - parentXY[0]}, ${xy[1] - parentXY[1]})`;
			}
		} else {
			lObj.style.left = xy[0] - parentXY[0] + 'px';
			lObj.style.top = xy[1] - parentXY[1] + 'px';
		}
	}
}


export default Index;