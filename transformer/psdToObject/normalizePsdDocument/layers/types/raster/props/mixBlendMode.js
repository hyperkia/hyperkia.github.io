function Index(l){
	const result = {};
	if(l.blendMode === 'linear burn') {		
		result['background-color'] = '#f60';
		result['mix-blend-mode'] = 'multiply';
		result.filter = 'brightness(0.85) contrast(1.25)';
	}
	return result;
}

export default Index;