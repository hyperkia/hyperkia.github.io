
const p = 'border-style';

function Index(s){
	const result = {};
	const v = s[p];
	if(v === 'none') return result;
	result[p] = v;
	return result;
}

export default Index;