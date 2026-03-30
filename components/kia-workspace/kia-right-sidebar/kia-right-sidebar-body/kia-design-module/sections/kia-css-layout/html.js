const html = `
	<section part="module-section">
		<header part="module-header">
			<h5 part="module-title">Layout</h5>
			<kia-button data-icon="ellipsis-solid-full-symbol" style="display:none;"></kia-button>
		</header>

		<div part="module-row">
			<div part="module-col">
				<h6 part="module-col-title">Dimensions</h6>
				<kia-prop-input data-id="prop-width" data-prop="width" data-unit="px" data-label-text="W" data-type="number" data-min="0" data-max="100000"></kia-prop-input> 
			</div>

			<div part="module-col">				
				<kia-prop-input data-id="prop-height" data-prop="height" data-unit="px" data-label-text="H" data-type="number" data-min="0" data-max="100000"></kia-prop-input> 				
			</div>

			<div class="dimension-proportional-button-colm" part="module-col module-last-btn-col w16">
				<kia-button class="dimension-proportional-button" data-icon="arrows_output-symbol"></kia-button>
			</div>

			<div class="padding-design-module" part="module-col w80">
				<h6 part="module-col-title">Padding</h6>								
				<div class="padding-inputs">
					<input class="padding-top" type="number" data-prop="padding-top" data-unit="px" data-min="0" data-max="1000">
					<input class="padding-right" type="number" data-prop="padding-right" data-unit="px" data-min="0" data-max="1000">
					<input class="padding-bottom" type="number" data-prop="padding-bottom" data-unit="px" data-min="0" data-max="1000">
					<input class="padding-left" type="number" data-prop="padding-left" data-unit="px" data-min="0" data-max="1000">
				</div>
			</div>

			<div class="padding-proportional-col" part="module-col w16">				
				<kia-button data-icon="crop_free-symbol"></kia-button>
			</div>
		</div>
	</section>
	
	
`;

export default html;