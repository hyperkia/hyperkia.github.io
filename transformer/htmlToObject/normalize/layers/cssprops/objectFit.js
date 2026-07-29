
const p = 'object-fit';

function Index(s){
	const result = {};
	const v = s[p];
	if(v === 'fill') return result;
	result[p] = v;
	return result;
}

export default Index;