function Index(rgb) {
    return "#" + KIA.utils.color.valueToHex(parseInt(rgb.r)) + KIA.utils.color.valueToHex(parseInt(rgb.g)) + KIA.utils.color.valueToHex(parseInt(rgb.b));
}

export default Index;