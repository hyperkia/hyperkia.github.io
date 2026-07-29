function Index(fontName = '') {
    const match = fontName.match(
        /^(.*?)[\s\-_](thin|extralight|ultralight|light|regular|normal|book|medium|semibold|demibold|bold|extrabold|ultrabold|black|heavy)(?:[\s\-_](italic|oblique))?$/i
    );

    if (!match) {
        return {
            family: fontName,
            weight: 400,
            style: 'normal'
        };
    }

    const [, family, weightName, styleName] = match;

    const weights = {
        thin: 100,
        extralight: 200,
        ultralight: 200,
        light: 300,
        regular: 400,
        normal: 400,
        book: 400,
        medium: 500,
        semibold: 600,
        demibold: 600,
        bold: 700,
        extrabold: 800,
        ultrabold: 800,
        black: 900,
        heavy: 900
    };

    return {
        'font-family': KIA.utils.font.getFontFamily(family.trim()),
        'font-weight': weights[weightName.toLowerCase()] || 400,
        'font-style': styleName ? 'italic' : 'normal'
    };
}

export default Index;