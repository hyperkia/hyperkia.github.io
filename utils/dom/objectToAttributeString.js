function Index(attrs){
	return Object.entries(attrs).map(([k, v]) => `${k}="${v}"`).join(' ');
}

export default Index;