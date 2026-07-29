
function Index(pageEl){	
	const svgChilds = pageEl.querySelectorAll('svg.canvas-layer *');
	svgChilds.forEach((svgChild)=>{		
		const layerObj = KIA.nodesMap[svgChild.dataset.layer];
		if(!layerObj) return;
		if(layerObj.clipping) {
			svgChild.dataset.clipping = true;
		}
	});

	const clipEls = pageEl.querySelectorAll('.canvas-layer [data-clipping="true"]');
	clipEls.forEach((clipEl)=>{
		if(clipEl.previousElementSibling?.dataset.clipping) return;
		const maskId = `mask-${crypto.randomUUID()}`;
		const maskEl = KIA.utils.svg.createSvgElement('mask',{id: maskId});
		maskEl.setAttribute('maskUnits', 'userSpaceOnUse')
		maskEl.setAttribute('maskContentUnits', 'userSpaceOnUse')
		maskEl.classList.add('mask-layer');
		clipEl.before(maskEl);
	});

	const maskLayerEls = pageEl.querySelectorAll('svg.canvas-layer .mask-layer');
	maskLayerEls.forEach((mEl) => {		
		let prevEl = mEl.previousElementSibling;
		mEl.append(prevEl);
	});

	maskLayerEls.forEach((mEl)=>{
		let maskId = '';
		[...mEl.parentElement.children].forEach((cEl)=>{
			if(cEl.tagName === 'mask') maskId = cEl.id;
			if(cEl.dataset.clipping) cEl.setAttribute('mask', `url(#${maskId})`);
		})
	});

	maskLayerEls.forEach((maskEl)=>{
		const innerhtml = maskEl.innerHTML;
		maskEl.insertAdjacentHTML('afterend', innerhtml);
	})
}

export default Index;