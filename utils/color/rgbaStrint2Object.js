function Index(str){
	const rgba = str.split('(')[1].split(')')[0].split(',');
    if (rgba.length === 3) rgba.push('1');
    const rgbaObject = {
        r: +(rgba[0]),
        g: +(rgba[1]),
        b: +(rgba[2]),
        a: +(rgba[3]),
    }
    return rgbaObject;
}

export default Index;