function Index(el, props){
	const result = {};
	const elCss = window.getComputedStyle(el);
	props.forEach((p)=>{
		result[p] = elCss[p];
	});
	return result;
}

export default Index;