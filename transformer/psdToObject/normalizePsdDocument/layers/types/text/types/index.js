import richText from './richText/index.js';
import plainText from './plainText/index.js';

function Index(l) {
	const isRichText = l.text.styleRuns;

	if(!isRichText) return plainText(l);
	if(isRichText) return richText(l);
}

export default Index;