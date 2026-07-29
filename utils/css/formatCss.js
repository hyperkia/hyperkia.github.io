
function Index(cssString, indent = 2) {
  const spacing = ' '.repeat(indent);
  return cssString
    .split(';')
    .map(style => style.trim())
    .filter(style => style.length > 0)
    .map(style => `${spacing}${style};`)
    .join('\n');
}

export default Index;