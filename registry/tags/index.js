
import data from './data.js';

const Index = {
	getGroup(){},

	isText(nodeName){
		return data[nodeName]?.editable;
	},

	canTransform(nodeName){
		return data[nodeName]?.transformGroup;
	},

	canHaveChildren(nodeName){
		return data[nodeName].canHaveChildren;
	},
	
	isContainer(){},

	getUIType(nodeName){		
		return data[nodeName]?.uiGroup;
	}
}

export default Index;