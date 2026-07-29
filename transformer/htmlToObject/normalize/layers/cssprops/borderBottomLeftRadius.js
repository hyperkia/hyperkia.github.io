
const p = 'border-bottom-left-radius';

function Index(s){
	const result = {};
	const v = s[p];
	if(v === '0px') return result;
	result[p] = v;
	return result;
}

export default Index;