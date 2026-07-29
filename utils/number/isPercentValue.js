function Index(value) {
  return typeof value === 'string' && value.endsWith('%');
}

export default Index;