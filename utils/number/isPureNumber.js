function Index(value) {
  if (typeof value === "number") {
    return Number.isFinite(value); // handles NaN, Infinity
  }

  if (typeof value === "string") {
    const trimmed = value.trim();

    // Regex: optional sign, digits, optional decimal part
    return /^[-+]?\d+(\.\d+)?$/.test(trimmed);
  }

  return false;
}

export default Index;