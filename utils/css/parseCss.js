function Index(cssText) {
    const style = document.createElement('div').style;

    const obj = {};

    cssText
        .split(';')
        .map(v => v.trim())
        .filter(Boolean)
        .forEach(rule => {

            const index = rule.indexOf(':');

            if (index === -1) return;

            const prop = rule.slice(0, index).trim();
            const value = rule.slice(index + 1).trim();

            // skip invalid css
            if (!CSS.supports(prop, value)) return;

            style.setProperty(prop, value);

            obj[prop] = style.getPropertyValue(prop).trim();
        });

    return obj;
}

export default Index;