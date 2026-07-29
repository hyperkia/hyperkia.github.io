function Index(node){
	return {
		id: node.hyperkiaId,
		parent: node.hyperkiaParent,
		tagName: '',
		title: node.name,
		attributes: {},
		style: {},
		instanceof: '',
		children: node.hyperkiaChildren || [],
		clipping: node.clipping,
		stack: [],
	}
}

export default Index;