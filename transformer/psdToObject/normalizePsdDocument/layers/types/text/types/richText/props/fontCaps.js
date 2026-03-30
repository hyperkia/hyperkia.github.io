function Index(l) {	
	const result = {};
	const fontCaps = l.text.style?.fontCaps;
	if(fontCaps === 1) result['font-variant'] = 'small-caps';
	if(fontCaps === 2) result['text-transform'] = 'uppercase';
	return result;
}

export default Index;