
const p = 'vertical-align';

function Index(s){
	const result = {};
	const v = s[p];
	if(v === 'baseline') return result;
	result[p] = v;
	return result;
}

export default Index;