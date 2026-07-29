async function Index(blobUrl) {
    const response = await fetch(blobUrl);
    if (!response.ok) {
        throw new Error(`Failed to fetch blob: ${response.status}`);
    }

    const blob = await response.blob();

    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);

        reader.readAsDataURL(blob);
    });
}

export default Index;