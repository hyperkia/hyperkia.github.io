import props from '../utils/props.js';


const Index = {
	init(){
		const projectFonts = KIA.state.canvas.getProp('projectFonts');
		const missingFonts = new Set();		
		const layers = KIA.state.layers.getLayers();
		for(let [id,lObj] of Object.entries(layers)) {			
			const layerFont = lObj.style['font-family'];
			if(!projectFonts[layerFont] && layerFont) missingFonts.add(layerFont);

			const nesredEls = KIA.utils.dom.getNodesFromHTML(lObj.textContent);
			nesredEls.forEach((el)=>{
				const ff = el.style['font-family'];

				if(!projectFonts[ff] && ff) missingFonts.add(ff);
			})
		}

		if(missingFonts.size === 0) {
			props.root.close();
			return;
		}

		let fontListHtml = '';
		let weightHtml = '';
		const projectFontsName = Object.keys(projectFonts);
		projectFontsName.forEach((fn,i)=>{
			fontListHtml += `<li class="select-option ${i===0?'selected':''}" value="${fn}">${fn}</li>`
		})

		let html = '';
		[...missingFonts].forEach((mf)=>{
			html += `
				<div class="missing-item" data-target="dropdown">
					<span class="missing-font" title="${KIA.utils.string.escapeHtml(mf)}">${KIA.utils.string.escapeHtml(mf)}</span>
					<kia-select class="available-fonts" value="${projectFontsName[0]}">
						<details part="details" class="select-wrapper">
							<summary part="summary" class="select-trigger">${projectFontsName[0]}</summary>
							<ul class="select-options scroll-design" style="width: 100%;top: calc(100% + 5px);transform: none;">
								${fontListHtml}
							</ul>
						</details>
					</kia-select>
					<kia-select class="font-weight-select" value="400" data-id="font-weight-select" data-iweights="${projectFonts[projectFontsName[0]].i}" data-nweights="${projectFonts[projectFontsName[0]].n}">
						<details class="select-wrapper">
					        <summary class="select-trigger">Regular</summary>
					        <ul class="select-options scroll-design" data-id="font-weights" style="width:145px;">
								<li class="select-option" part="select-option i1" value="100-italic">Thin Italic</li>
								<li class="select-option" part="select-option i2" value="200-italic">Extra Light Italic</li>
								<li class="select-option" part="select-option i3" value="300-italic">Light Italic</li>
								<li class="select-option" part="select-option i4" value="400-italic">Regular Italic</li>
								<li class="select-option" part="select-option i5" value="500-italic">Medium Italic</li>
								<li class="select-option" part="select-option i6" value="600-italic">Semi Bold Italic</li>
								<li class="select-option" part="select-option i7" value="700-italic">Bold Italic</li>
								<li class="select-option" part="select-option i8" value="800-italic">Extra Bold Italic</li>
								<li class="select-option" part="select-option i9" value="900-italic">Black Italic</li>

								<li class="select-option" part="select-option n1" value="100">Thin</li>
								<li class="select-option" part="select-option n2" value="200">Extra Light</li>
								<li class="select-option" part="select-option n3" value="300">Light</li>
								<li class="select-option" part="select-option n4" value="400">Regular</li>
								<li class="select-option" part="select-option n5" value="500">Medium</li>
								<li class="select-option" part="select-option n6" value="600">Semi Bold</li>
								<li class="select-option" part="select-option n7" value="700">Bold</li>
								<li class="select-option" part="select-option n8" value="800">Extra Bold</li>
								<li class="select-option" part="select-option n9" value="900">Black</li>
					        </ul>
					    </details>
					</kia-select>					
				</div>	
			`;
		});

		props.root.$id.missingItems.innerHTML = html;
	},
};

export default Index;