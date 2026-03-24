async function Index(fonts) {
    if(!fonts) return;
    for (const [name, blob] of Object.entries(fonts)) {
        const url = URL.createObjectURL(blob);

        const font = new FontFace(name, `url(${url})`);
        await font.load();

        document.fonts.add(font);

        URL.revokeObjectURL(url);
    }
}

export default Index;