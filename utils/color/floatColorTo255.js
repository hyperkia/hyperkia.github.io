function Index(v) {
  // Normalize tiny floating-point errors
  if (v >= 0 && v <= 1.001) {
    return Math.round(Math.min(Math.max(v, 0), 1) * 255);
  }

  return Math.round(v);
}

export default Index;