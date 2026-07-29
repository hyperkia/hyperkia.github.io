function Index (css='') {
  const cssObj = {};

  css.split(';').forEach((rule)=>{
  	if(!rule) return;
  	const [key, value] = rule.split(':');
  	cssObj[key] = value.trim();
  })

  return cssObj;
}

export default Index;