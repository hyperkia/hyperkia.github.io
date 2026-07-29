function Index(g) {
  return {
    type: g.variant,
    angle: +g.angle.toFixed(2),
    scale: +((g.scale ?? 1).toFixed(3)),
    stops: g.stops,    
  };
}

export default Index;