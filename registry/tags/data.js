const TagRegistry = {
    // =========================
    // SECTION / CONTAINER
    // =========================
    ARTICLE: { uiGroup: 'container', canHaveChildren: true, transformGroup: 'container' },
    ASIDE: { uiGroup: 'container', canHaveChildren: true, transformGroup: 'container' },
    DIV: { uiGroup: 'container', canHaveChildren: true, transformGroup: 'container' },
    FIGCAPTION: { uiGroup: 'container', canHaveChildren: true, transformGroup: 'container' },
    FIGURE: { uiGroup: 'container', canHaveChildren: true, transformGroup: 'container' },
    FOOTER: { uiGroup: 'container', canHaveChildren: true, transformGroup: 'container' },
    HEADER: { uiGroup: 'container', canHaveChildren: true, transformGroup: 'container' },
    MAIN: { uiGroup: 'container', canHaveChildren: true, transformGroup: 'container' },
    NAV: { uiGroup: 'container', canHaveChildren: true, transformGroup: 'container' },
    SECTION: { uiGroup: 'container', canHaveChildren: true, transformGroup: 'container' },


    // =========================
    // TEXT
    // =========================
    P: { uiGroup: 'text', type: 'block', editable: true, transformGroup: 'text' },
    H1: { uiGroup: 'text', type: 'block', editable: true, transformGroup: 'text' },
    H2: { uiGroup: 'text', type: 'block', editable: true, transformGroup: 'text' },
    H3: { uiGroup: 'text', type: 'block', editable: true, transformGroup: 'text' },
    H4: { uiGroup: 'text', type: 'block', editable: true, transformGroup: 'text' },
    H5: { uiGroup: 'text', type: 'block', editable: true, transformGroup: 'text' },
    H6: { uiGroup: 'text', type: 'block', editable: true, transformGroup: 'text' },
    BLOCKQUOTE: { uiGroup: 'text', type: 'block', editable: true, transformGroup: 'text' },
    PRE: { uiGroup: 'text', type: 'block', editable: true, transformGroup: 'text' },
    CODE: { uiGroup: 'text', type: 'inline', editable: true, transformGroup: 'text' },
    ADDRESS: { uiGroup: 'text', type: 'block', editable: true, transformGroup: 'text' },


    // =========================
    // MEDIA
    // =========================
    IMG: { uiGroup: 'media', },
    AUDIO: { uiGroup: 'media', },
    VIDEO: { uiGroup: 'media', },


    // =========================
    // SVG SHAPES
    // =========================
    svg: { uiGroup: 'container' },
    circle: { uiGroup: 'shape' },
    ellipse: { uiGroup: 'shape' },
    rect: { uiGroup: 'shape' },
    path: { uiGroup: 'shape' },
    line: { uiGroup: 'shape' }
};

export default TagRegistry;