function Index(style = {}) {
  return Object.entries(style)
    .map(([prop, value]) => {
      if (value == null) return '';
      return `${prop}:${value};`;
    })
    .join('');
}

export default Index;
