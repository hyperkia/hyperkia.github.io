const html = `
	<section part="module-section">
		<header part="module-header">
			<h5 part="module-title">Appearance</h5>
			<kia-button data-icon="ellipsis-solid-full-symbol" style="display:none;"></kia-button>
		</header>

		<div class="module-row" part="module-row">
			<div part="module-col">	
				<h6 part="module-col-title">Opacity</h6>			
				<kia-prop-input class="opacity-input" data-prop="opacity" data-label-icon="opacity" data-type="number" data-min="0" data-max="100" data-step="1"></kia-prop-input> 
			</div>
			<div class="corner-radius-col" part="module-col">				
				<h6 part="module-col-title">Corner Radius</h6>			
				<kia-prop-input class="border-radius-input" data-prop="border-radius" data-label-icon="crop_free" data-type="number" data-min="0" data-max="9999" data-unit="px"></kia-prop-input> 
			</div>
			<div class="corner-radius-lastbtn-col" part="module-col module-last-btn-col w16">				
				<kia-button data-event="toggleAllRadius" data-icon="crop_free-symbol"></kia-button>
			</div>
			<div class="single-border-radius" part="module-col">				
				<kia-prop-input class="border-top-left-radius" data-prop="border-top-left-radius" data-label-icon="rounded_corner" data-type="number" data-min="0" data-max="9999" data-unit="px"></kia-prop-input> 
			</div>
			<div class="single-border-radius" part="module-col">
				<kia-prop-input class="border-top-right-radius" data-prop="border-top-right-radius" data-label-icon="rounded_corner" data-type="number" data-min="0" data-max="9999" data-unit="px"></kia-prop-input> 
			</div>
			<div class="single-border-radius" part="module-col">
				<kia-prop-input class="border-bottom-left-radius" data-prop="border-bottom-left-radius" data-label-icon="rounded_corner" data-type="number" data-min="0" data-max="9999" data-unit="px"></kia-prop-input> 
			</div>
			<div class="single-border-radius" part="module-col">
				<kia-prop-input class="border-bottom-right-radius" data-prop="border-bottom-right-radius" data-label-icon="rounded_corner" data-type="number" data-min="0" data-max="9999" data-unit="px"></kia-prop-input> 
			</div>
		</div>
	</section>
`;

export default html;