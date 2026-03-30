function Index(lh, tr) {
	if(!lh) return;
	let scaleY = 1;
	if(tr) scaleY = tr[3];
	const finalLineHeight = (lh * scaleY).toFixed(2);
	return finalLineHeight;
}

export default Index;
