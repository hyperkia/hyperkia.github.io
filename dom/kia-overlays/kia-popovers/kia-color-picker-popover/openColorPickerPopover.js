function Index() {
	if(!KIA.kiaColorPickerPopover) {
		const el = document.createElement('kia-color-picker-popover');
		el.classList.add('popover');
		el.setAttribute('data-class', 'popover');
		el.style.cssText = `left:100px;top:40px;`;
		const linkEls = KIA.kiaPopovers._qsAll('link');
		linkEls[linkEls.length-1].after(el);
	}
	KIA.kiaPopovers.classList.add('show');
	KIA.kiaColorPickerPopover.open();
}

export default Index;