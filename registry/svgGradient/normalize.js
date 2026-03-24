function Index(g) {
  return {
    type: g.type,
    angle: +g.angle.toFixed(2),
    scale: +((g.scale ?? 1).toFixed(3)),
    colorStops: g.colorStops.map(s => ({
      offset: +s.offset.toFixed(2),
      r: Math.round(s.r),
      g: Math.round(s.g),
      b: Math.round(s.b)
    })),
    opacityStops: (g.opacityStops || []).map(s => ({
      offset: +s.offset.toFixed(2),
      opacity: +s.opacity.toFixed(3)
    }))
  };
}

export default Index;