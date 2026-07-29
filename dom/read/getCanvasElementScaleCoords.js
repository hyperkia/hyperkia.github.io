function Index({ e, element}) {
  const rect = element.getBoundingClientRect();

  return {
    x: Math.floor((e.clientX - rect.left) / KIA.state.ui.getProp('canvasZoom')),
    y: Math.floor((e.clientY - rect.top) / KIA.state.ui.getProp('canvasZoom'))
  };
}

export default Index;