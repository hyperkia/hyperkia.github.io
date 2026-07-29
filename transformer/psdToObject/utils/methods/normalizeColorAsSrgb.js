import props from '../props.js';

function getColorConvertedMethodName(){
	let result = '';
	const xmp = props.rawPsd.imageResources.xmpMetadata;
	const colorMode = xmp.match(
	  /<photoshop:ColorMode>(.*?)<\/photoshop:ColorMode>/
	)?.[1];

	const iccProfile = xmp.match(
	  /<photoshop:ICCProfile>(.*?)<\/photoshop:ICCProfile>/
	)?.[1];

	switch (iccProfile) {	  
	  case "Adobe RGB (1998)":
	    result = 'adobeRGBToBrowserHexa';
	    break;

	  case "Display P3":
	    console.log("Display P3");
	    break;

	  default:
	    console.log("Unknown or custom profile:", iccProfile);
	}

	return result;
}

function Index(){

	const colorParseMethod = KIA.utils.color[getColorConvertedMethodName()];
	if(!colorParseMethod) return;
	for (const [lId, lObj] of Object.entries(props.parse.layers)) {

    	if(lObj.attributes.fill) lObj.attributes.fill = KIA.utils.color.adobeRGBToBrowserHexa(lObj.attributes.fill);
    	if(lObj.attributes.stroke) lObj.attributes.stroke = KIA.utils.color.adobeRGBToBrowserHexa(lObj.attributes.stroke);

    	if(lObj.style.color) lObj.style.color = KIA.utils.color.adobeRGBToBrowserHexa(lObj.style.color);
    	if(lObj.style['background-color']) lObj.style['background-color'] = KIA.utils.color.adobeRGBToBrowserHexa(lObj.style['background-color']);

    	lObj.stack.forEach((s)=>{
    		if(s.type !== "gradient") return;
    		s.stops.forEach((stop)=>{
    			if(stop.rgb) stop.hexa = KIA.utils.color.adobeRGBToBrowserHexa(stop.rgb);
    		})
    	});

    }
}

export default Index;