
import props from '../../../../../utils/props.js';

function Index(nodeObj){
	const node = props.nodes[nodeObj.id];
    const shapeType = node?.text?.shapeType;
    let result = {
        'white-space': "normal",
        overflow: "visible"
    };

    if (shapeType === "point") {
        result = {
            'white-space': "pre",
            overflow: "visible"
        };
    }

    if (shapeType === "box") {
        result = {
            'white-space': "pre-wrap",
            overflow: "visible"
        };
    }

    Object.assign(nodeObj.style, result);
}

export default Index;