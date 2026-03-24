function Index(css, source) {

	if(source === 'propsInputToSelection' && css.opacity) css.opacity = (css.opacity/100).toFixed(2);
	if(source === 'SelectionToPropsInput' && css.opacity) css.opacity = (css.opacity*100).toFixed(0);
	if(!css.opacity) css.opacity = '';

}

export default Index;