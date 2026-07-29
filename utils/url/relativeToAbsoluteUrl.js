function Index(src, baseUrl) {
  try {
    let absoluteSrc = '';

    const host = new URL(baseUrl).hostname;
    if(src.indexOf('/') === 0) {
      absoluteSrc = host + src;
    }

    // ensure http or https
    if(!absoluteSrc.startsWith('http')) absoluteSrc = 'https://'+absoluteSrc;

    return absoluteSrc;

  } catch {
    return src;
  }
}

export default Index;