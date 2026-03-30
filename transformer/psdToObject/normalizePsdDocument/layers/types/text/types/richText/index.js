
import props from './props/index.js'
import methods from './methods/index.js'

function Index(l) {
	const obj = {
		css: {height: 'auto'},
		innerText: '',
	};
	
	for(let p in props) Object.assign(obj.css, props[p](l));
	obj.innerText = methods.innerHtml(l);
	
	return obj;
}
 
export default Index;