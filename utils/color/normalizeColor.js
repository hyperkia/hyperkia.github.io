function Index(color) {
	const el = document.createElement('div');
	el.style.display = 'none';
	el.style.color = color;

	document.body.appendChild(el);

	const value = getComputedStyle(el).color;

	el.remove();

	return value;
}

export default Index;