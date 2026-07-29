
function Index(style){	
	const result = {};
	for(let [p,v] of Object.entries(style)) {
		if(!v) continue;
		if(v.includes?.('px') || v.includes?.('deg')) {
			result[p] = parseInt(v);
		} else {
			result[p] = v;
		}
	}

	return result;
}

export default Index;