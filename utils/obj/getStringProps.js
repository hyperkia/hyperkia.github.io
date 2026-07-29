function Index(obj, excludeProps) {
  const result = [];

  for (const prop in obj) {
    if(excludeProps.includes(prop)) continue;
    const value = obj[prop];

    if (typeof value === "string") {
      result.push(prop);
    }
  }

  return result;
}

export default Index;