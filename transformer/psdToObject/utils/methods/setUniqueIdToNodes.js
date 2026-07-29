
import props from '../props.js';

function getLayerType(layer){

	// Group / folder
	if (Array.isArray(layer.children)) {
		return 'group';
	}

	// Text / Rich text
	if (layer.text) {

		if (layer.text.styleRuns) {
			return 'richText';
		}

		return 'text';
	}

	// Smart object
	if (
		layer.smartObject ||
		layer.placedLayer
	) {
		if(layer.clipping) return 'clipSmartObject';
		return 'smartObject';
	}

	// Adjustment layer
	if (layer.adjustment) {
		return 'adjustment';
	}

	// Shape / vector
	if (
		layer.vectorFill ||
		layer.vectorStroke ||
		layer.vectorMask ||
		layer.pathList
	) {

		// Editable vector path exists
		if (layer.vectorMask?.paths?.length) {
			return 'pathShape';
		}

		// Generic vector/fill shape
		return 'shape';
	}

	// Pixel / raster layer
	if (layer.canvas) {
		return 'pixel';
	}

	return 'unknown';
}

function parseNode(node){
	node.hyperkiaId = crypto.randomUUID();
	const layerType = getLayerType(node);
	props.nodes[node.hyperkiaId] = node;
	node.hyperkiaPsd = {layerType};
}

function treeWalk(node) {
	node.children && node.children.forEach((node)=>{
		if(!node.hidden) treeWalk(node)
	})
	if(!node.hidden) parseNode(node);
}

function Index(){
	treeWalk(props.rawPsd);
}

export default Index;