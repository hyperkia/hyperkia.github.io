function Index(input) {
  if (typeof input !== "string") return false;

  input = input.trim();

  // Add https:// if user typed only www.
  if (input.startsWith("www.")) {
    input = "https://" + input;
  }

  try {
    const url = new URL(input);

    // Allow only http or https
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return false;
    }

    // Basic domain validation (must contain dot)
    if (!url.hostname.includes(".")) {
      return false;
    }

    return true;

  } catch {
    return false;
  }
}

export default Index;