function Index(str){
	const rgba = KIA.utils.color.rgbaStrint2Object(str);
    const hexa = KIA.utils.color.rgbToHex(rgba) + (rgba.a ? KIA.utils.color.alpha100NumberToHex(rgba.a * 100) : '');
    return hexa;
}

export default Index;