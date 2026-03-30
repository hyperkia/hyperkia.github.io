 
import psdToObject from './psdToObject/index.js';
import htmlToObject from './htmlToObject/index.js';
import fontsToObject from './fontsToObject/index.js';
import fflateZip from './fflateZip/index.js';

const transformer = {
	psdToObject,
	htmlToObject,
	fontsToObject,
	fflateZip,
};


KIA.transformer = transformer;