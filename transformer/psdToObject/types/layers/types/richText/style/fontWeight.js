import props from '../../../../../utils/props.js';

function getWeight(fontName) {

	// Highest priority first
	if (
		fontName.includes('thin')
	) return 100;

	if (
		fontName.includes('extralight') ||
		fontName.includes('ultralight')
	) return 200;

	if (fontName.includes('light')) return 300;

	if (fontName.includes('regular')) return 400;
	if (fontName.includes('normal')) return 400;
	if (fontName.includes('book')) return 400;

	if (fontName.includes('medium')) return 500;

	if (
		fontName.includes('semibold') ||
		fontName.includes('demibold')
	) return 600;

	if (
		fontName.includes('extrabold') ||
		fontName.includes('ultrabold')
	) return 800;

	if (
		fontName.includes('black') ||
		fontName.includes('heavy')
	) return 900;

	// Bold AFTER extra/ultra bold checks
	if (fontName.includes('bold')) return 700;

	return 400;
}

function Index(nodeObj){
	const node = props.nodes[nodeObj.id];
	const fontName = node.text.style?.font?.name.toLowerCase() || 'normal';
	const fontWeight = getWeight(fontName);
	nodeObj.style['font-weight'] = fontWeight;
}

export default Index;

