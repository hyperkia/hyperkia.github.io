function Index(fontName = '') {
    let normFontName = fontName.replace(
        /[\s\-_](thin|extralight|ultralight|light|regular|normal|book|medium|semibold|demibold|bold|extrabold|ultrabold|black|heavy)(?:[\s\-_](italic|oblique))?$/i,
        '');
    let splitCamelCaseFont = KIA.utils.string.splitCamelCase(normFontName);
    splitCamelCaseFont = splitCamelCaseFont.replace(
        /\s+(Thin|ExtraLight|UltraLight|Light|Regular|Normal|Book|Medium|SemiBold|DemiBold|Bold|ExtraBold|UltraBold|Black|Heavy|Italic|Oblique)(?:\s+(Italic|Oblique))?$/i,
        ''
    ).trim();
    if(KIA.data.fonts.getFont('google', splitCamelCaseFont)) return splitCamelCaseFont;
    return normFontName;
}

export default Index;