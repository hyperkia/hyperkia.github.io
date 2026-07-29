
const html = `
	<section class="section">		
		<div class="tools" data-id="tools">
			<span class="tool-item triangle activetool" data-tool="triangle">
				<svg xmlns="http://www.w3.org/2000/svg" style="rotate: -80deg;"><use href="assets/images/svg-icons.svg#location-arrow-solid-full-symbol"></use></svg>
			</span>
			<span class="tool-item htmltag" data-tool="sectionhtml" data-id="htmltag">
				<svg xmlns="http://www.w3.org/2000/svg"><use href="assets/images/svg-icons.svg#code-solid-full-symbol"></use></svg>
			</span>
			<kia-select class="dropdown-tools-select" data-name="switchHTMLTag">
				<details part="details" class="select-wrapper">
					<summary part="summary" class="select-trigger">SECTION</summary>
					<ul class="select-options scroll-design" style="width: 120px;bottom: 110%;top:inherit;transform: none;max-height: 220px;left: -37px;">					            
						<li class="select-option selected" value="sectionhtml">Section</li>						
						<li class="select-option" value="imghtml">Image</li>
						<!--
						<li class="select-option" value="audiohtml">Audio</li>
						<li class="select-option" value="videohtml">Video</li>											
						<li class="select-option" value="documenthtml">Document</li>
						-->
					</ul>
				</details>
			</kia-select>
			<span class="tool-item text" data-tool="texthtml">
				<svg xmlns="http://www.w3.org/2000/svg"><use href="assets/images/svg-icons.svg#type-symbol"></use></svg>
			</span>	
			<span class="tool-item svgshape" data-tool="svgtag" data-id="svgshape"></span>
			<kia-select class="dropdown-tools-select" data-id="switchSVGtool" data-name="switchSVGtool">
				<details part="details" class="select-wrapper">
					<summary part="summary" class="select-trigger">hi</summary>
					<ul part="select-options" class="select-options scroll-design" style="left: -37px;bottom: 110% !important;top:inherit;transform:none;">
						<li part="select-option" class="select-option selected" value="rectsvg">
							<i class="rect-icon" part="rect-icon select-option-i"></i>
							Rectangle
						</li>
						<li part="select-option" class="select-option" value="linesvg">
							<i class="line-icon" part="line-icon select-option-i"></i>
							Line
						</li> 						
						<li part="select-option" class="select-option" value="ellipsesvg">
							<i class="ellipse-icon" part="ellipse-icon select-option-i"></i>
							Ellipse
						</li>
						<!--<li part="select-option" class="select-option" value="pathsvg">
							<svg part="select-option-svg" xmlns="http://www.w3.org/2000/svg">
								<use href="assets/images/svg-icons.svg#conversion_path-symbol"></use>
							</svg>
							Path
						</li>-->
						<li part="select-option" class="select-option" value="moresvg">
							<i class="moresvg-icon" part="moresvg-icon">...</i>
							More
						</li>
					</ul>
				</details>
			</kia-select>
			<span class="tool-item magnifying-glass" data-tool="zoom">
				<svg xmlns="http://www.w3.org/2000/svg"><use href="/assets/images/svg-icons.svg#magnifying-glass-solid-full-symbol"></use></svg>
			</span>	
			<span class="tool-item hand" data-tool="hand">
				<svg xmlns="http://www.w3.org/2000/svg"><use href="/assets/images/svg-icons.svg#hand-solid-full-symbol"></use></svg>
			</span>			
		</div>
	</section>
`;


export default html;