const html = `
	<section part="module-section">
		<header part="module-header">
			<h5 part="module-title">Position</h5>
			<kia-button data-icon="ellipsis-solid-full-symbol" style="display:none;"></kia-button>
		</header>

		<div part="module-row">
			<!--
			<div part="module-col w83">
				<h6 part="module-col-title">Alignment</h6>
				<kia-prop-radios class="justify-content" data-html="justify-content"></kia-prop-radios>
				<kia-prop-radios class="align-items" data-html="align-items"></kia-prop-radios>
			</div>
			-->

			<div part="module-col">
				<h6 part="module-col-title">Position</h6>
				<kia-prop-input data-id="prop-left" data-prop="left" data-label-text="X" data-type="number" data-unit="px" data-min="-100000" data-max="100000"></kia-prop-input> 
			</div>

			<div part="module-col">				
				<kia-prop-input data-id="prop-top" data-prop="top" data-label-text="Y" data-type="number" data-unit="px" data-min="-100000" data-max="100000"></kia-prop-input> 
			</div>

			<div part="module-col">
				<h6 part="module-col-title">Transform</h6>
				<kia-prop-input data-id="prop-rotate" data-prop="rotate" data-label-icon="rotate_auto" data-type="number" data-unit="deg" data-min="-360" data-max="360"></kia-prop-input> 
			</div>

			<div part="module-col w50">				
				<div part="radios-inputs">					
					<kia-prop-radios data-html="roateScale"></kia-prop-radios>				
				</div>
			</div>
		</div>
	</section>
	
	
`;

export default html;