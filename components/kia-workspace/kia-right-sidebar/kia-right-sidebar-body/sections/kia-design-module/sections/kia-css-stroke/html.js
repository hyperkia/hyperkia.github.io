const html = `
	<section part="module-section">
		<header part="module-header">
			<h5 part="module-title">Stroke</h5>
			<kia-button data-icon="ellipsis-solid-full-symbol" style="display:none;"></kia-button>
		</header>

		<div class="module-row" part="module-row">
			<div part="module-col w55">
				<kia-prop-input class="prop-border-color" data-prop="border-color" data-label-icon="rectangle" data-type="text" data-placeholder="#383838"></kia-prop-input> 
			</div>

			<div part="module-col"></div>

			<div class="border-style-colm" part="module-col">
				<h6 part="module-col-title">Style</h6>
				<kia-prop-select data-prop="border-style" value="none" data-name="border-style">
					<details class="select-wrapper">
						<summary class="select-trigger">None</summary>
						<div class="select-options scroll-design" style="width:120px;">					            
							<span class="select-option" value="dashed">Dashed</span>
							<span class="select-option" value="dotted">Dotted</span>
							<span class="select-option" value="double">Double</span>
							<span class="select-option" value="groove">Groove</span>
							<span class="select-option" value="hidden">Hidden</span>
							<span class="select-option" value="inherit">Inherit</span>
							<span class="select-option" value="inset">Inset</span>
							<span class="select-option" value="none">None</span>
							<span class="select-option" value="outset">Outset</span>
							<span class="select-option" value="rivert">Rivert</span>
							<span class="select-option" value="revert-layer">Rayert Layer</span>
							<span class="select-option" value="ridge">Ridge</span>
							<span class="select-option selected" value="solid">Solid</span>
						</div>
					</details>
				</kia-prop-select>								
			</div>

			<div part="module-col">				
				<h6 part="module-col-title">Weight</h6>
				<kia-prop-input class="border-width-input" data-prop="border-width" data-unit="px" data-label-icon="line_weight" data-type="number" data-min="0" data-max="1000"></kia-prop-input> 
			</div>	

			<div class="stroke-dasharray-colm" part="module-col">
				<h6 part="module-col-title">Dash Pattern</h6>
				<kia-prop-input data-prop="stroke-dasharray" data-label-icon="grip-lines-solid-full" data data-type="text" data-placeholder="5, 6"></kia-prop-input> 
			</div>

			<div class="all-border-button-colm" part="module-col module-last-btn-col w16">				
				<kia-button class="all-border-button" data-icon="all-border-symbol" data-event="toggleAllWidth"></kia-button>
			</div>

			<div class="single-border-width" part="module-col">
				<kia-prop-input class="border-width-input-top" data-prop="border-top-width" data-unit="px" data-label-customicon="true" data-type="number" data-min="0" data-max="1000"></kia-prop-input> 
			</div>

			<div class="single-border-width" part="module-col">								
				<kia-prop-input class="border-width-input-right" data-prop="border-right-width" data-unit="px" data-label-customicon="true" data-type="number" data-min="0" data-max="1000"></kia-prop-input> 
			</div>

			<div class="single-border-width" part="module-col">								
				<kia-prop-input class="border-width-input-bottom" data-prop="border-bottom-width" data-unit="px" data-label-customicon="true" data-type="number" data-min="0" data-max="1000"></kia-prop-input> 
			</div>

			<div class="single-border-width" part="module-col">								
				<kia-prop-input class="border-width-input-left" data-prop="border-left-width" data-unit="px" data-label-customicon="true" data-type="number" data-min="0" data-max="1000"></kia-prop-input> 
			</div>

			












			
		</div>
	</section>	
`;

export default html;