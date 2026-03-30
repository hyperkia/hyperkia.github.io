async function Index(filesMap) {
  const entries = await Promise.all(
    Object.entries(filesMap).map(async ([id, fileObj]) => {
      const blob = await fetch(fileObj.url).then(r => r.blob());

      const base64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });

      return [
        id,
        {
          key: fileObj.key,
          name: fileObj.name,
          size: fileObj.size,
          type: fileObj.type,
          data: base64
        }
      ];
    })
  );

  return Object.fromEntries(entries);
}

export default Index;