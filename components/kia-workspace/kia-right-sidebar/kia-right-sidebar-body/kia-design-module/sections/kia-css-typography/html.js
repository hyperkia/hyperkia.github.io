const html = `
	<section part="module-section">
		<header part="module-header">
			<h5 part="module-title">Typography</h5>
			<kia-button data-icon="ellipsis-solid-full-symbol" style="display:none;"></kia-button>
		</header>
 
		<div part="module-row">
			<div part="module-col w55">
				<kia-prop-input class="prop-color" data-id="prop-color" data-prop="color" data-label-icon="rectangle" data-type="text" data-placeholder="#383838"></kia-prop-input> 
			</div>
			<div part="module-col w79">
				<kia-prop-select class="font-family" data-prop="font-family" value="" data-id="font-family-select" data-name="font-family">
					<details class="select-wrapper">
				        <summary class="select-trigger" part="summary">Add Font</summary>
				        <div class="select-options scroll-design" style="width:100%;">
							<span class="select-option">Add Font</span>							
				        </div>
				    </details>
				</kia-prop-select>	
			</div>
			<div part="module-col module-last-btn-col w16">				
				<kia-button class="add-font-family" data-icon="plus-solid-symbol" data-event="addFontFamily"></kia-button>
			</div>
			<div part="module-col">															
				<kia-prop-select class="font-weight-select" data-prop="font-weight" value="400" data-id="font-weight-select">
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
				</kia-prop-select>	
			</div>
			<div part="module-col">				
				<kia-prop-input data-prop="font-size" data-unit="px" data-label-icon="type" data-type="number" data-min="0" data-max="1000"></kia-prop-input> 
			</div>
			<div part="module-col">																			
				<kia-prop-input class="line-height-input" data-prop="line-height" data-unit="px" data-label-text="A" data-type="number" data-min="0" data-max="1000"></kia-prop-input> 
			</div>
			<div part="module-col">																			
				<kia-prop-input class="letter-spacing-input" data-prop="letter-spacing" data-unit="px" data-label-text="A" data-type="number" data-min="0" data-max="100"></kia-prop-input> 
			</div>
			<div part="module-col w55">
				<h6 part="module-col-title">Text Alignment</h6>								
				<kia-prop-radios data-html="text-align"></kia-prop-radios>
			</div> 
		</div>
	</section>
`;

export default html;