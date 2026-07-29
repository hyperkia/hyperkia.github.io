function Index(rgba) {
	return `rgba(${Math.round(rgba.r)}, ${Math.round(rgba.g)}, ${Math.round(rgba.b)}, ${Math.round(rgba.a||1)})`;
}

export default Index;