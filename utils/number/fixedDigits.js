function Index(num, digits=2) {
  const factor = 10 ** digits;
  return +((Math.floor(num * factor) / factor).toFixed(digits));
}

export default Index;