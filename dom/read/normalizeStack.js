function Index(node){
	const stack = node.stack;
	const result = {
		style: {},
		attributes: {},
	};

	// Fill
	const fillStack = stack.find((s) => s.type==='gradient' && node.instanceof==='svg' && s.name==='fill');
	let fill = '';
	if(fillStack) fill = `url(#${KIA.registry.svgGradient.createRegistry(fillStack)})`;
	if(fill) result.attributes.fill = fill;
	

	return result;
}

export default Index;