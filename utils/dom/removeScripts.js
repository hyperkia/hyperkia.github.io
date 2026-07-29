function Index(html) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    doc.querySelectorAll("script").forEach(el => el.remove());
    return doc.documentElement.outerHTML;
}

export default Index;