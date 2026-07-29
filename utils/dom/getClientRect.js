function Index(element) {
    const rect = element.getBoundingClientRect();
    return {
        top: +((rect.y).toFixed(0)),
        right: +((rect.right).toFixed(0)),
        bottom: +((rect.bottom).toFixed(0)),
        left: +((rect.x).toFixed(0)),
        width: +((rect.width).toFixed(0)),
        height: +((rect.height).toFixed(0)),
    }
}

export default Index;