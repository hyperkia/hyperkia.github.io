function Index(n) {
  const num = parseFloat(n.toFixed(2));
  return num === 0 ? 0 : num;
}

export default Index;