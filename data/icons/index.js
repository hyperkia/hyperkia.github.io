
import fontawesome from './fontawesome/index.js';

const LIBS = {
	fontawesome,
};


const Index = {

	getIcon: function(library, name){
		return LIBS[library].getIcon(name);
	},

	getIcons: function(library) {
		return LIBS[library].getIcons();
	},

	getIconsName: function(library) {
		return LIBS[library].getIconsName();
	}

}

export default Index;

