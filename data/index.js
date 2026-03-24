import icons from './icons/index.js';
import fonts from './fonts/index.js';


if(window.KIA){
	document.body.innerHTML = '<h1>KIA is reserve keyword, please use different identifier</h1>';
	throw new Error('KIA is reserve keyword, please use different identifier');
} else {
	window.KIA = {
		data: {
			icons,
			fonts,
		}
	};
}
