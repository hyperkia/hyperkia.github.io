function Index() {
	const key = KIA.state.ui.selectionKeys.values().next().value;
	const layerObj = KIA.state.layers.map[key];
	
	const css = {
		filter: [],
		'text-shadow': [],
		'box-shadow': [],		
	};

	for(let [k,s] of Object.entries(layerObj.stack)) {
		if(s.status === false || s.trash === true) continue;
		if(s.type === 'filter' || s.name === 'drop-shadow') css.filter.push(`${s.name}(${s.value})`);
		if(s.name === 'text-shadow') css['text-shadow'].push(s.value);
		if(s.name === 'box-shadow') css['box-shadow'].push(s.value);
	}

	if(css.filter.length === 0) css.filter.push('none');
	if(css['text-shadow'].length === 0) css['text-shadow'].push('none');
	if(css['box-shadow'].length === 0) css['box-shadow'].push('none');

	css.filter = css.filter.join(' ');
	css['text-shadow'] = css['text-shadow'].join(',');
	css['box-shadow'] = css['box-shadow'].join(',');

	return css;
}

export default Index;