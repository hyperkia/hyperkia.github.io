function Index(l) {
	return `
		<${l.nodeName} data-name="${l.name}" class="canvas-layer ${l.attrs.class || ''}" draggable="false" data-layer="${l.key}"></${l.nodeName}>
	`;
}

export default Index;