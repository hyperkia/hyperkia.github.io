function Index(assets){
	if(!assets) return;
	const result = {};
    for (const [key, item] of Object.entries(assets)) {
        const url = URL.createObjectURL(item.blob);
        result[key] = {
        	key,
        	name: item.name,
        	size: item.size,
        	type: item.type,
        	url,
        }
    }
    return result;
}

export default Index;