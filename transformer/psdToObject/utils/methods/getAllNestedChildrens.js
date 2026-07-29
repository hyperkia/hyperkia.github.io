import props from '../props.js';

function Index(lObj) {
    const result = [];

    function traverse(lObj) {
        if (!lObj?.children) return;

        for (const child of lObj.children) {
            result.push(child);
            traverse(props.nodesObj[child]);
        }
    }

    traverse(lObj);

    return result;
}

export default Index;