async function Index(e) {
  e.preventDefault();

  // 1. Try files (system)
  if (e.dataTransfer.files.length > 0) {
    return e.dataTransfer.files[0];
  }

  // 2. Try URL (browser drag)
  const items = e.dataTransfer.items;

  for (const item of items) {
    if (item.type === "text/uri-list") {
      return new Promise((resolve) => {
        item.getAsString(async (url) => {
          const res = await fetch(url);
          const blob = await res.blob();
          resolve(new File([blob], "dragged-image", { type: blob.type }));
        });
      });
    }
  }

  return null;
}

export default Index;