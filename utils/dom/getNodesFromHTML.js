function Index(html){
    if(!html) return [];
	const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    return [...doc.body.querySelectorAll('*')];
}

export default Index;	