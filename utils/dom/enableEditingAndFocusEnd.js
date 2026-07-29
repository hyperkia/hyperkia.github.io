function Index(editElement) {
    if (editElement.contentEditable === 'true') return;
    editElement.contentEditable = true;
    editElement.focus();
    editElement.dataset.oldValue = editElement.innerText;

    const selection = window.getSelection();
    const range = document.createRange();

    // go inside the div’s text nodes
    const walker = document.createTreeWalker(
        editElement,
        NodeFilter.SHOW_TEXT
    );

    let lastTextNode = null;
    while (walker.nextNode()) {
        lastTextNode = walker.currentNode;
    }

    if (lastTextNode) {
        range.setStart(lastTextNode, lastTextNode.length);
        range.collapse(true);
    } else {
        range.selectNodeContents(editElement);
        range.collapse(false);
    }

    selection.removeAllRanges();
    selection.addRange(range);
}

export default Index;