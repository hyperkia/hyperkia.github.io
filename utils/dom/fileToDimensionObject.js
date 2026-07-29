async function Index(file) {
  try {
    return await createImageBitmap(file);
  } catch {
    return getImageSize(file); // fallback
  }
}

export default Index;