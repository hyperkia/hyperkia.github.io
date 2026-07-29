
import props from '../../utils/props.js';
import types from './types/index.js';

import layerMethods from './methods/index.js';

async function parseNode(node){
	if(!props.nodes[node.hyperkiaId]) return;
	if(node.hyperkiaPage) return;
	await types(node);
}

async function treeWalk(node) {
	if (node.children) {
		for (const child of node.children) {
			await treeWalk(child);
		}
	}

	await parseNode(node);
}

async function Index(){	
	await treeWalk(props.rawPsd);
	layerMethods.normalizeRectLikePathShape();
	layerMethods.normalizeRectShape();
	layerMethods.normalizeCircleLikePathShape();	
	await layerMethods.normalizeGroupTagName();
	await layerMethods.norGroupSGroupTagName();
	await layerMethods.createSvgParentTopGroup();
	await layerMethods.createSvgParentShape();
	await layerMethods.createSvgParentShapeNoGroup();
	await layerMethods.normalizeSvgBounds();
	await layerMethods.normalizeRichTextContent();
	await layerMethods.hostCommonStyleToParentInRichtext();
	await layerMethods.normalizeTextLayerLineHeight();
	await layerMethods.normalizeSvgImage();
	await layerMethods.normalizeLayersPosition();
	await layerMethods.normalizeMixBlendMode();
	await layerMethods.normalizeTextLayerHeight();
	await layerMethods.normalizeNonMaskContextSvgTextLayer();
	await layerMethods.norPointTextTopPosition();
	await layerMethods.norRichTextContentLineHeight();
}
 
export default Index;