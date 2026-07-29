

function Index(id) {
	const layerObj = KIA.nodesMap[id];
	
	const style = {
		filter: [],
		'text-shadow': [],
		'box-shadow': [],		
	};

	layerObj.stack.forEach((s)=>{
		if(!s.enable) return;
		
		if(s.type === 'filter') style.filter.push(`${s.name}(${s.value.amount}${s.value.unit})`);

		if(s.name === 'text-shadow') {
			style['text-shadow'].push(
				`${s.value.offsetX}px ${s.value.offsetY}px ${s.value.blurRadius}px ${s.value.color}`
			);
		}

		if(s.name === 'box-shadow') {
			style['box-shadow'].push(
				`${s.value.inset ? 'inset ' : ''}${s.value.offsetX}px ${s.value.offsetY}px ${s.value.blurRadius}px ${s.value.spreadRadius}px ${s.value.color}`
			);
		}

		if(s.name === 'drop-shadow') {			
			style.filter.push(
				`${s.name}(${s.value.offsetX}px ${s.value.offsetY}px ${s.value.blurRadius}px ${s.value.color})`
			);
		}
	})

	if(style.filter.length === 0) style.filter.push('none');
	if(style['text-shadow'].length === 0) style['text-shadow'].push('none');
	if(style['box-shadow'].length === 0) style['box-shadow'].push('none');

	style.filter = style.filter.join(' ');
	style['text-shadow'] = style['text-shadow'].join(',');
	style['box-shadow'] = style['box-shadow'].join(',');

	return style;
}

export default Index;