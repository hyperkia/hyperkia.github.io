function Index(id) {
	const obj = typeof id === 'string' ? KIA.nodesMap[id] : id;
	if(obj && ['html','svg'].includes(obj.instanceof)) return 'layers';
	if(obj && obj.instanceof === 'document') return 'pages';

	return id;
}

export default Index;