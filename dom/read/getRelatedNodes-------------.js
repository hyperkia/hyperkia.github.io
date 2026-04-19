
import props from './props.js';

function Index(nodeName) {
	if(props.SECTION_TAGS.includes(nodeName)) return props.SECTION_TAGS;
	if(props.TEXT_TAGS.includes(nodeName)) return props.TEXT_TAGS;
	return null;
}

export default Index; 