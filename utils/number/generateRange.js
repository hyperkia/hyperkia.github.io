function Index(min, max, step = 1) {

  const values = [];

  for (let i = min; i <= max; i += step) {
    values.push(i);
  }

  return values;

}

export default Index;