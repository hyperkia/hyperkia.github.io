function Index(str) {
    return btoa(
        new TextEncoder()
        .encode(str)
        .reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
}

export default Index;