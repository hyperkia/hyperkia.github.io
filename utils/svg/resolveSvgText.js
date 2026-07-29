
function getXYValue(objEl,obj){	
	let xy = [];
	if(obj.tagName === 'g') {
		xy = obj.attributes.transform.split('\(')[1].replace(')','').split(',');
	} else if(obj.tagName === 'P') {
		xy = [parseInt(obj.style.left), parseInt(obj.style.top)];
	} else if(objEl.closest('svg')) {		
		xy = [+obj.attributes.x, +obj.attributes.y];
	} else if(obj.style.left) {
		xy = [parseInt(obj.style.left), parseInt(obj.style.top)];
	}
	
	return xy;
}


function setForeignObjectBounding(pageEl) {
    const foreignObjectEls = pageEl.querySelectorAll('svg.canvas-layer foreignObject');
    const canvasScale = KIA.state.ui.getProp('canvasZoom');

    foreignObjectEls.forEach((fEl,i) => {

        const pEls = fEl.querySelectorAll('p');
        if (!pEls.length) return;

        const top = [], left = [], width = [], bottom = [];

        pEls.forEach((pEl) => {
        	const obj = KIA.nodesMap[pEl.dataset.layer];
            const objXY = getXYValue(pEl,obj);
            
            left.push(objXY[0]);
            top.push(objXY[1]);
            bottom.push(objXY[1]+parseInt(obj.style.height));
            width.push(parseInt(obj.style.width));
                        
        });

        const minLeft = Math.min(...left);
        const minTop = Math.min(...top);
        const maxBottom = Math.max(...bottom);
        const maxWidth = Math.max(...width);        

        const parentEl = fEl.parentElement;       
        const parentObj = KIA.nodesMap[parentEl.dataset.layer];
        const parentXY = getXYValue(parentEl, parentObj);

        fEl.setAttribute( 'x', minLeft - parentXY[0]);
        fEl.setAttribute( 'y', minTop - parentXY[1]);
        fEl.setAttribute( 'width', maxWidth);        
        fEl.setAttribute( 'height', maxBottom-minTop);        
    });
}

function normTextElementsPosotion(pageEl){
	const textEls = pageEl.querySelectorAll('svg.canvas-layer foreignObject > div > *');
	textEls.forEach((textEl)=>{
		const foEl = textEl.closest('foreignObject');		
        const tXY = foEl.parentElement.getAttribute('transform').split('\(')[1].replace(')','').split(',');
		const textElObj = KIA.nodesMap[textEl.dataset.layer];
		textEl.style.left = parseInt(textElObj.style.left) - foEl.x.baseVal.value - tXY[0] + 'px';
		textEl.style.top = parseInt(textElObj.style.top) - foEl.y.baseVal.value - tXY[1] + 'px';
	})
}


function Index(pageEl){
	return;
	const svgTextEls = pageEl.querySelectorAll('svg.canvas-layer p:not(:has(+p))');
	svgTextEls.forEach((pEl)=>{
		const foreignObjectEl = KIA.utils.svg.createSvgElement('foreignObject');
		pEl.after(foreignObjectEl);
	});

	const foreignObjectEls = pageEl.querySelectorAll('svg.canvas-layer foreignObject');
	foreignObjectEls.forEach((fEl)=>{
		const divEl = document.createElementNS('http://www.w3.org/1999/xhtml','div');
		fEl.appendChild(divEl);

		let prevEl = fEl.previousElementSibling;
		let i = 0;
		while(prevEl && prevEl.tagName==='P') {
			divEl.appendChild(prevEl);
			prevEl = fEl.previousElementSibling;
			if(i===1000) break;
			i++;
		}

	});

	setForeignObjectBounding(pageEl);
	normTextElementsPosotion(pageEl);
}

export default Index;