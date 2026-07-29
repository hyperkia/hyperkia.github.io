
import google from './google/index.js';

const LIBS = {
	google,
};


const Index = {

	getFont: function(library, name){
		return LIBS[library].getFont(name);
	},

	getFonts: function(library) {
		return LIBS[library].getFonts();
	},

	getFontsName: function(library) {
		return LIBS[library].getFontsName();
	}

}

export default Index;