const html = `
	<section part="module-section">
		<header part="module-header">
			<h5 part="module-title">Effect</h5>
			<kia-button data-icon="ellipsis-solid-full-symbol" style="display:none;"></kia-button>
		</header>

		<div part="module-row">
			<div part="module-col w80">
				<kia-select value="box-shadow" data-id="effect-options">
					<details class="select-wrapper">
						<summary part="effect-options-summary" class="select-trigger">Box Shadow</summary>
						<div class="select-options scroll-design" style="width:120px;">					            										
							<span part="box-shadow" class="select-option selected" value="box-shadow">Box Shadow</span>
							<span part="drop-shadow" class="select-option" value="drop-shadow">Drop Shadow</span>
							<span part="text-shadow" class="select-option" part="text-shadow-option" value="text-shadow">Text Shadow</span>											
						</div>
					</details>
				</kia-prop-select>
			</div>

			<div class="module-last-btn-col" part="module-col module-last-btn-col w16">				
				<kia-button class="add-effect-button" data-icon="plus-solid-symbol" data-event="addEffect"></kia-button>
			</div>			
 
			<div class="effect-item-column" part="module-col w100">
				<ul class="effect-items" data-id="effect-items"></ul>
				<template data-id="effect-item-template">
					<li class="effect-item" data-shadow="box">
						<button class="effect-edit mask-image-before" mask-image-before="pen-solid-full" data-event="effectEdit"></button>
						<span class="effect-name" data-event="effectEdit"></span>
						<button class="effect-visibility mask-image-before" data-effect-visible="true" data-event="effectVisible"></button>
						<button class="effect-remove mask-image-before" mask-image-before="minus-solid-full" data-event="effectRemove"></button>
					</li>								
				</template>	
			</div>
		</div>
	</section>	
`;

export default html;