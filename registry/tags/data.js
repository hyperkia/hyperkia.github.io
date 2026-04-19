const TagRegistry = { 
  // =========================
  // SECTION / CONTAINER
  // =========================
  ADDRESS: { uiGroup: 'container', canHaveChildren: true, transformGroup: 'container' },
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
  A: { uiGroup: 'text', type: 'inline', editable: true },
  ABBR: { uiGroup: 'text', type: 'inline', editable: true },
  B: { uiGroup: 'text', type: 'inline', editable: true },
  CITE: { uiGroup: 'text', type: 'inline', editable: true },
  DATA: { uiGroup: 'text', type: 'inline', editable: true },
  EM: { uiGroup: 'text', type: 'inline', editable: true },

  H1: { uiGroup: 'text', type: 'block', editable: true, transformGroup: 'container' },
  H2: { uiGroup: 'text', type: 'block', editable: true, transformGroup: 'container' },
  H3: { uiGroup: 'text', type: 'block', editable: true, transformGroup: 'container' },
  H4: { uiGroup: 'text', type: 'block', editable: true, transformGroup: 'container' },
  H5: { uiGroup: 'text', type: 'block', editable: true, transformGroup: 'container' },
  H6: { uiGroup: 'text', type: 'block', editable: true, transformGroup: 'container' },

  I: { uiGroup: 'text', type: 'inline', editable: true },
  LABEL: { uiGroup: 'text', type: 'inline', editable: true },
  MARK: { uiGroup: 'text', type: 'inline', editable: true },
  P: { uiGroup: 'text', type: 'block', editable: true },
  Q: { uiGroup: 'text', type: 'inline', editable: true },
  SMALL: { uiGroup: 'text', type: 'inline', editable: true },
  SPAN: { uiGroup: 'text', type: 'inline', editable: true },
  STRONG: { uiGroup: 'text', type: 'inline', editable: true },
  TIME: { uiGroup: 'text', type: 'inline', editable: true },
  U: { uiGroup: 'text', type: 'inline', editable: true },


  // =========================
  // MEDIA
  // =========================
  IMG: { uiGroup: 'media', },
  AUDIO: { uiGroup: 'media', },
  VIDEO: { uiGroup: 'media', },


  // =========================
  // SVG SHAPES
  // =========================
  svg: { uiGroup: 'container'},
  circle: { uiGroup: 'shape'},
  ellipse: { uiGroup: 'shape'},
  rect: { uiGroup: 'shape'},
  path: { uiGroup: 'shape'},
  line: { uiGroup: 'shape'}
};

export default TagRegistry;