function Index(l) {
	return `<${l.nodeName} class="canvas-layer texthtml" draggable="false" data-layer="${l.key}">${l.innerText}</${l.nodeName}>`;
}

export default Index;