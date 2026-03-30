function Index() {
	let html = {};
    let css = [];

    // Already Render
    const renderKeys = [...KIA.kiaCanvas._qsAll('[data-render="true"]')].map(p => p.dataset.page);

	const layers = KIA.state.layers.map;

	for(let key in layers) {

		const l = layers[key];
		if(renderKeys.includes(l.pId)) continue;
		if(!html[l.pId]) html[l.pId] = [];

        // IMG
        if(l.nodeName === 'img') {
        	html[l.pId].push(`<img class="canvas-layer imghtml" src="${l.attrs.src||''}" draggable="false" data-layer="${l.key}" />`);
        } 


        // Audio
        else if (l.nodeName === 'audio') {
        	html[l.pId].push(`
				<div class="canvas-layer audiohtml" data-layer="${l.key}" draggable="false">
					<audio src="" controls="true"></audio>
				</div>
			`);
        }


        // Video
        else if (l.nodeName === 'video') {
        	if(l.plateform === 'youtube') {
				const src = KIA.utils.string.mapYouTubeUrlToEmbedUrl(l.attrs.src);				
				html[l.pId].push(`<div class="canvas-layer videohtml" data-layer="${l.key}" draggable="false">
					<iframe width="100%" height="100%" src="${src}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
				</div>
			`);
			}
        }


        // Document
        else if(l.nodeName === 'document') {
			html[l.pId].push(`
				<div class="canvas-layer documenthtml" data-layer="${l.key}" draggable="false">
					<iframe src="${l.attrs.src}" loading="lazy"></iframe>
				</div>
			`);
		}


		// SVG
		else if (l.scss) {
            const svgAttrs = Object.entries(l.attrs).map(([k, v]) => `${k}="${v}"`).join(' ');                
            const shapeAttrs = Object.entries(l.sattrs).map(([k, v]) => `${k}="${v}"`).join(' ');

            html[l.pId].push(`
            	<svg class="canvas-layer" xmlns="http://www.w3.org/2000/svg" ${svgAttrs} data-layer="${l.key}">
                	<${l.nodeName} ${shapeAttrs} data-svgshape="${l.key}"></${l.nodeName}>
                </svg>
            `);
        }


        // Text
        else if (l.innerText) {
        	html[l.pId].push(`<${l.nodeName} class="canvas-layer texthtml" draggable="false" data-layer="${l.key}">${l.innerText}</${l.nodeName}>`);
        } 


        // Section
        else {
        	html[l.pId].push(`<${l.nodeName} class="canvas-layer" draggable="false" data-layer="${l.key}"></${l.nodeName}>`);
        }


		// HTML CSS
		const cssStr = KIA.utils.css.objectToCss(l.css);
		css.push(`[data-layer="${l.key}"]{${cssStr}}`);

		// SVG CSS
		if (l.scss) {
			const shapeCssStr = KIA.utils.css.objectToCss(l.scss);
			css.push(`[data-svgshape="${l.key}"]{${shapeCssStr}}`);			
		}		
	}

	for(let pId in html) {
		const pageEl = KIA.kiaCanvas.$id['page'+pId];
    	pageEl.insertAdjacentHTML('beforeend', html[pId].join(''));
    	pageEl.dataset.render = true;
    }
    KIA.kiaCanvas.$id.style.innerHTML += css.join('');
}

export default Index;