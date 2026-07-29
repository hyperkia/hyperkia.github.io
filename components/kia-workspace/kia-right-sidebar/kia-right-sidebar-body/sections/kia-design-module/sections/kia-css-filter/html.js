const html = `
	<section part="module-section">
		<header part="module-header">
			<h5 part="module-title">Filter</h5>
			<kia-button data-icon="ellipsis-solid-full-symbol" style="display:none;"></kia-button>
		</header>

		<div class="filter-items-row" part="module-row" data-id="filter-items-row">
			<div class="filter-options-colm" part="module-col w80">
				<kia-select class="filter-options" value="blur" data-id="filter-options" dataset-name="filter-options">
					<details class="select-wrapper">
						<summary class="select-trigger">Blur</summary>
						<div class="select-options scroll-design" style="width:120px;">					            										
							<span class="select-option selected" part="blur" value="blur">Blur</span>
							<span class="select-option" part="brightness" value="brightness">Brightness</span>
							<span class="select-option" part="contrast" value="contrast">Contrast</span>
							<span class="select-option" part="grayscale" value="grayscale">Grayscale</span>
							<span class="select-option" part="hue-rotate" value="hue-rotate">Hue Rotate</span>
							<span class="select-option" part="invert" value="invert">Invert</span>
							<span class="select-option" part="saturate" value="saturate">Saturate</span>
							<span class="select-option" part="sepia" value="sepia">Sepia</span>
						</div>
					</details>
				</kia-select>
			</div>

			<div class="module-last-btn-col add-filter-colm" part="module-col module-last-btn-col w16">				
				<kia-button class="add-effect-button" data-icon="plus-solid-symbol" data-event="addFilter"></kia-button>
			</div>
 
			<!-- Blur -->
			<div class="filter-item-column" data-class="filterItemColumn" part="module-col w100" data-filter="blur">
				<h6 class="module-col-title" part="module-col-title">Blur</h6>				
				<kia-input data-prop="filter-blur" data-unit="px" data-label-icon="blur_on" data-type="number" data-min="0" data-max="100" data-default="0"></kia-input> 				
				<button class="filter-visible mask-image-before" data-filter-visible="true" data-event="filterVisible"></button>
				<button class="filter-remove mask-image-before" mask-image-before="minus-solid-full" data-event="filterRemove"></button>
			</div>

			<!-- Brightness -->
			<div class="filter-item-column" data-class="filterItemColumn" part="module-col w100" data-filter="brightness">
				<h6 class="module-col-title" part="module-col-title">Brightness</h6>
				<kia-input data-prop="filter-brightness" data-unit="%" data-label-icon="light_mode" data-type="number" data-min="1" data-max="200" data-default="100"></kia-input>
				<button class="filter-visible mask-image-before" data-filter-visible="true" data-event="filterVisible"></button>
				<button class="filter-remove mask-image-before" mask-image-before="minus-solid-full" data-event="filterRemove"></button>
			</div>

			<!-- Contrast -->
			<div class="filter-item-column" data-class="filterItemColumn" part="module-col w100" data-filter="contrast">
				<h6 class="module-col-title" part="module-col-title">Contrast</h6>				
				<kia-input data-prop="filter-contrast" data-unit="%" data-label-icon="contrast" data-type="number" data-min="0" data-max="300" data-default="100"></kia-input>
				<button class="filter-visible mask-image-before" data-filter-visible="true" data-event="filterVisible"></button>
				<button class="filter-remove mask-image-before" mask-image-before="minus-solid-full" data-event="filterRemove"></button>
			</div>

			<!-- Grayscale -->
			<div class="filter-item-column" data-class="filterItemColumn" part="module-col w100" data-filter="grayscale">
				<h6 class="module-col-title" part="module-col-title">Grayscale</h6>				
				<kia-input class="filter-grayscale" data-prop="filter-grayscale" data-unit="%" data-label-icon="invert_colors_off" data-type="number" data-min="0" data-max="100" data-default="0"></kia-input>
				<button class="filter-visible mask-image-before" data-filter-visible="true" data-event="filterVisible"></button>
				<button class="filter-remove mask-image-before" mask-image-before="minus-solid-full" data-event="filterRemove"></button>
			</div>

			<!-- Opacity -->
			<div class="filter-item-column" data-class="filterItemColumn" part="module-col w100" data-filter="opacity">
				<h6 class="module-col-title" part="module-col-title">Opacity</h6>				
				<kia-input class="filter-opacity" data-prop="filter-opacity" data-unit="%" data-label-icon="opacity" data-type="number" data-min="0" data-max="100" data-default="0"></kia-input>
				<button class="filter-visible mask-image-before" data-filter-visible="true" data-event="filterVisible"></button>
				<button class="filter-remove mask-image-before" mask-image-before="minus-solid-full" data-event="filterRemove"></button>
			</div>

			<!-- Hue Rotate -->
			<div class="filter-item-column" data-class="filterItemColumn" part="module-col w100" data-filter="hue-rotate">
				<h6 class="module-col-title" part="module-col-title">Hue Rotate</h6>				
				<kia-input class="filter-hue-rotate" data-prop="filter-hue-rotate" data-unit="deg" data-label-icon="palette" data-type="number" data-min="0" data-max="100" data-default="0"></kia-input>
				<button class="filter-visible mask-image-before" data-filter-visible="true" data-event="filterVisible"></button>
				<button class="filter-remove mask-image-before" mask-image-before="minus-solid-full" data-event="filterRemove"></button>
			</div>

			<!-- Invert -->
			<div class="filter-item-column" data-class="filterItemColumn" part="module-col w100" data-filter="invert">
				<h6 class="module-col-title" part="module-col-title">Invert</h6>				
				<kia-input class="filter-invert" data-prop="filter-invert" data-unit="%" data-label-icon="invert_colors" data-type="number" data-min="0" data-max="100" data-default="0"></kia-input>
				<button class="filter-visible mask-image-before" data-filter-visible="true" data-event="filterVisible"></button>
				<button class="filter-remove mask-image-before" mask-image-before="minus-solid-full" data-event="filterRemove"></button>
			</div>

			<!-- Saturate -->
			<div class="filter-item-column" data-class="filterItemColumn" part="module-col w100" data-filter="saturate">
				<h6 class="module-col-title" part="module-col-title">Saturate</h6>				
				<kia-input class="filter-saturate" data-prop="filter-saturate" data-unit="%" data-label-icon="water_drop" data-type="number" data-min="0" data-max="300" data-default="100"></kia-input>
				<button class="filter-visible mask-image-before" data-filter-visible="true" data-event="filterVisible"></button>
				<button class="filter-remove mask-image-before" mask-image-before="minus-solid-full" data-event="filterRemove"></button>
			</div>

			<!-- Sepia -->
			<div class="filter-item-column" data-class="filterItemColumn" part="module-col w100" data-filter="sepia">
				<h6 class="module-col-title" part="module-col-title">Sepia</h6>				
				<kia-input class="filter-sepia" data-prop="filter-sepia" data-unit="%" data-label-icon="filter_vintage" data-type="number" data-min="0" data-max="100" data-default="0"></kia-input>
				<button class="filter-visible mask-image-before" data-filter-visible="true" data-event="filterVisible"></button>
				<button class="filter-remove mask-image-before" mask-image-before="minus-solid-full" data-event="filterRemove"></button>
			</div>
		</div>
	</section>
	
	
`;

export default html;