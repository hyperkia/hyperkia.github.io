
import props from './props/index.js'

function Index(layer) {
	const obj = {
		css: {height: 'auto'},
	};
	for(let p in props) Object.assign(obj.css, props[p](layer));

	

	return obj;
}

export default Index;