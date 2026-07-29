
const p = 'justify-content';

function Index(s){
	const result = {};
	const v = s[p];
	if(v === 'normal') return result;
	result[p] = v;
	return result;
}

export default Index;