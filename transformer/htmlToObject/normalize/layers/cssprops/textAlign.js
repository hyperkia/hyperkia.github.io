
const p = 'text-align';

function Index(s){
	const result = {};
	const v = s[p];
	if(v === 'left') return result;
	result[p] = v;
	return result;
}

export default Index;