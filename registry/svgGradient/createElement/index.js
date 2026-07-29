
import linear from './linear.js';

function Index(id, normalized){
	if(normalized.type === 'linear') return linear(id, normalized);
}

export default Index;