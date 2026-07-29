function Index(root = document){
  const out = [];
  const walk = n => {
    if (n.nodeType === 1 && n.localName.includes('-')) out.push(n);
    [...(n.children || []), ...(n.shadowRoot?.children || [])].forEach(walk);
  };
  walk(root.documentElement || root);
  return out;
}

export default Index;