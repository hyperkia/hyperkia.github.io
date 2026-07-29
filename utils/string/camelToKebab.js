function Index(str) {
  return str.replace(/[A-Z]/g, m => '-' + m.toLowerCase());
}

export default Index;