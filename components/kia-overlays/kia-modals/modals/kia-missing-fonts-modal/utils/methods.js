import props from '../utils/props.js';


const Index = {
	init(){
		const availableFonts = KIA.state.canvas.projectFonts;
		const missingFonts = new Set();		
		const layers = KIA.state.layers.map;
		for(let k in layers) {
			const layerFont = layers[k].css['font-family'];
			if(!availableFonts[layerFont] && layerFont) missingFonts.add(layerFont);
		}

		const availableFontsName = Object.keys(availableFonts);

		let availableFontsHtml = `
			<kia-select class="available-fonts" value="${availableFontsName[0]}">
				<details part="details" class="select-wrapper">
					<summary part="summary" class="select-trigger">${availableFontsName[0]}</summary>
					<ul class="select-options scroll-design" style="width: 100%;top: calc(100% + 5px);transform: none;">
		`;
		
		availableFontsName.forEach((f,i)=>{
			availableFontsHtml += `<li class="select-option ${i===0?'selected':''}" value="${f}">${f}</li>`;
		})
		availableFontsHtml += `
					</ul>
				</details>
			</kia-select>
		`;
		
		let html = ``;
		for(let mf of missingFonts) {
			const key = crypto.randomUUID();
			props.fonts[key] = {name: mf,key};
			html += `
				<div class="missing-item" data-target="dropdown" data-font="${key}">
					<span class="missing-font" title="${KIA.utils.string.escapeHtml(mf)}">${KIA.utils.string.escapeHtml(mf)}</span>
					${availableFontsHtml}
					<div class="uploadCustomFont">
						<svg class="upload-icon" xmlns="http://www.w3.org/2000/svg">
  							<use href="assets/images/svg-icons.svg#upload-solid-full-symbol"></use>
  						</svg>						
						<input class="uploadCustomFont-input" type="file" accept=".ttf,.otf,.woff">
					</div>
				</div>	
			`;
		}
		html += `</div>`;
		props.root.$id.missingItems.innerHTML = html;
	},
};

export default Index;