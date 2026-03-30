function Index(l) {
	if (l.vectorFill.type === "color") {
	  const c = l.vectorFill.color;
	  const value = `rgb(${Math.round(c.r)}, ${Math.round(c.g)}, ${Math.round(c.b)})`;
	  
	  return {'fill': value};
	}
}

export default Index;