
const p = 'border-color';

function Index(s){
	const result = {};
	const v = KIA.utils.color.rgbaToHexa(s[p]);
	if(v === 'rgb(0, 0, 0)') return result;
	result[p] = v;
	return result;
}

export default Index;