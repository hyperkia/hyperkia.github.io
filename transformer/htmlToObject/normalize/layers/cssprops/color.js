
const p = 'color';

function Index(s){	
	const v = KIA.utils.color.rgbaToHexa(s[p]);
	return {
		[p]: v,
	}
}

export default Index;