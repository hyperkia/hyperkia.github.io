function Index(fs, tr) {
	if(!fs) return;
	let scaleY = 1;
	if(tr) scaleY = tr[3];
	const finalFontSize = (fs * scaleY).toFixed(2);
	return finalFontSize;
}

export default Index;