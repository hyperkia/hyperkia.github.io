function Index(obj) {
    const editElement = KIA.kiaPages._qs(`[data-page="${obj.key}"] .page-name`);
    if(!editElement.innerText.trim()) editElement.innerText = editElement.dataset.oldValue;
    editElement.removeAttribute('contenteditable');
}

export default Index;