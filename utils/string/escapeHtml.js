function Index(str) {
  if(typeof str !== 'string') return;
  return str
    .replaceAll(/&/g, "&amp;")
    .replaceAll(/"/g, "&quot;")
    .replaceAll(/'/g, "&#39;")
    .replaceAll(/</g, "&lt;")
    .replaceAll(/>/g, "&gt;");
}

export default Index;