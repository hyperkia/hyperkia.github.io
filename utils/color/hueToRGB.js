function Index(H) {
    let S = 1;
    let V = 1;

    let h = H / 60;
    let i = Math.floor(h);
    let f = h - i;
    let p = V * (1 - S);
    let q = V * (1 - f * S);
    let t = V * (1 - (1 - f) * S);

    let r, g, b;
    switch (i % 6) {
        case 0:
            r = V;
            g = t;
            b = p;
            break;
        case 1:
            r = q;
            g = V;
            b = p;
            break;
        case 2:
            r = p;
            g = V;
            b = t;
            break;
        case 3:
            r = p;
            g = q;
            b = V;
            break;
        case 4:
            r = t;
            g = p;
            b = V;
            break;
        case 5:
            r = V;
            g = p;
            b = q;
            break;
    }

    // Convert 0-1 to 0-255
    r = Math.round(r * 255);
    g = Math.round(g * 255);
    b = Math.round(b * 255);

    return { r, g, b };
}

export default Index;