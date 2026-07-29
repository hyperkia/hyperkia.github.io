
import data from './data.js';

const Index = {
	getGroup(){},

	isText(tagName){
		return data[tagName]?.editable;
	},

	canTransform(tagName){
		return data[tagName]?.transformGroup;
	},

	canHaveChildren(tagName){		
		return data[tagName]?.canHaveChildren || false;
	},
	
	isContainer(){},

	getUIType(tagName){		
		return data[tagName]?.uiGroup;
	}
}

export default Index;