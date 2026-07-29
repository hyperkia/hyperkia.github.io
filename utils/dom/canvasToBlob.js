function Index(canvas, name='layer.png') {
    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            if (!blob) return resolve(null);

            const file = new File([blob], name, {
                type: "image/png",
                lastModified: Date.now()
            });

            resolve(file);
        }, "image/png");
    });
}

export default Index;