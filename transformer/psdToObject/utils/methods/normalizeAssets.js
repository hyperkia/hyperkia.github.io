
import props from '../props.js';

async function Index(){
	for(const [lId, lObj] of Object.entries(props.parse.layers)) {

		let assetAttr = '';
		let stypeProp = '';
		if(lObj.attributes.src) assetAttr = 'src';
		if(lObj.attributes.href) assetAttr = 'href';
		if(lObj.style['mask-image']) stypeProp = 'mask-image';

		const assetFileObj = lObj.attributes[assetAttr] || lObj.style[stypeProp];

		if(assetFileObj instanceof File) {
			const id = crypto.randomUUID();
			props.parse.assets[id] = {
				id,
				name: assetFileObj.name,
				size: assetFileObj.size,
				type: assetFileObj.type,
				blob: assetFileObj,
				updatedAt: Date.now(),
				createdAt: Date.now(),
			}
			
			if(assetAttr) lObj.attributes[assetAttr] = id;			
			if(stypeProp === 'mask-image') {
				lObj.style[stypeProp] = id;
				lObj.style['-webkit-mask-image'] = id;
			}
		}
	}

}

export default Index;