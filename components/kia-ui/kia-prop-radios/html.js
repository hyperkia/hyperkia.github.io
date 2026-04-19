const Index = {
	'text-align': `
		<span class="input-wrapper">
			<input type="radio" name="text-align" value="left" title="Align left" data-prop="text-align" />
			<svg part="svg" xmlns="http://www.w3.org/2000/svg">
				<use href="assets/images/svg-icons.svg#align-left-solid-full-symbol"></use>
			</svg>
		</span>
		<span class="input-wrapper">
			<input type="radio" name="text-align" value="center" title="Align center" data-prop="text-align" />
			<svg part="svg" xmlns="http://www.w3.org/2000/svg">
				<use href="assets/images/svg-icons.svg#align-center-solid-full-symbol"></use>
			</svg>
		</span>
		<span class="input-wrapper">
			<input type="radio" name="text-align" value="right" title="Align right" data-prop="text-align" />
			<svg part="svg" xmlns="http://www.w3.org/2000/svg">
				<use href="assets/images/svg-icons.svg#align-right-solid-full-symbol"></use>
			</svg>
		</span>
		<span class="input-wrapper">
			<input type="radio" name="text-align" value="justify" title="Align justify" data-prop="text-align" />
			<svg part="svg" xmlns="http://www.w3.org/2000/svg">
				<use href="assets/images/svg-icons.svg#align-justify-solid-full-symbol"></use>
			</svg>
		</span>
	`,

	'justify-content': `
		<span class="input-wrapper">
			<input type="radio" name="justify-content" value="flex-start" title="Horizontal left" data-prop="justify-content" />
			<svg part="svg" xmlns="http://www.w3.org/2000/svg">
				<use href="assets/images/svg-icons.svg#align_justify_flex_start-symbol"></use>
			</svg>
		</span>

		<span class="input-wrapper">
			<input type="radio" name="justify-content" value="center" title="Horizontal center" data-prop="justify-content" />
			<svg part="svg" xmlns="http://www.w3.org/2000/svg">
				<use href="assets/images/svg-icons.svg#align_justify_center-symbol"></use>
			</svg>
		</span>

		<span class="input-wrapper">
			<input type="radio" name="justify-content" value="flex-end" title="Horizontal right" data-prop="justify-content" />
			<svg part="svg" xmlns="http://www.w3.org/2000/svg">
				<use href="assets/images/svg-icons.svg#align_justify_flex_end-symbol"></use>
			</svg>
		</span>		
	`,

	'align-items': `
		<span class="input-wrapper">
			<input type="radio" name="align-items" value="flex-start" title="Vertical top" data-prop="align-items" />
			<svg part="svg" xmlns="http://www.w3.org/2000/svg">
				<use href="assets/images/svg-icons.svg#align_vertical_top-symbol"></use>
			</svg>
		</span>

		<span class="input-wrapper">
			<input type="radio" name="align-items" value="center" title="Vertical center" data-prop="align-items" />
			<svg part="svg" xmlns="http://www.w3.org/2000/svg">
				<use href="assets/images/svg-icons.svg#align_vertical_center-symbol"></use>
			</svg>
		</span>

		<span class="input-wrapper">
			<input type="radio" name="align-items" value="flex-end" title="Vertical bottom" data-prop="align-items" />
			<svg part="svg" xmlns="http://www.w3.org/2000/svg">
				<use href="assets/images/svg-icons.svg#align_vertical_bottom-symbol"></use>
			</svg>
		</span>
	`,

	'roateScale': `
		<span class="input-wrapper">
			<input type="radio" data-prop="rotate90" data-unit="deg" title="Rotate 90°" />
			<svg part="svg" xmlns="http://www.w3.org/2000/svg">
				<use href="assets/images/svg-icons.svg#rotate_90_degrees_cw-symbol"></use>
			</svg>
		</span>

		<span class="input-wrapper">
			<input type="radio" data-prop="flip-horizontal" title="Flip horizontally" />
			<svg part="svg" xmlns="http://www.w3.org/2000/svg" style="rotate: 90deg;">
				<use href="assets/images/svg-icons.svg#align-vertical-symbol"></use>
			</svg>
		</span>

		<span class="input-wrapper">
			<input type="radio" data-prop="flip-vertical" title="Flip vertically" />
			<svg part="svg" xmlns="http://www.w3.org/2000/svg">
				<use href="assets/images/svg-icons.svg#align-vertical-symbol"></use>
			</svg>
		</span>
	`,

	'text-transform': `
		<span class="input-wrapper">
			<input type="radio" name="text-transform" value="uppercase" title="Uppercase" data-prop="text-transform" />
			<span>AB</span>
		</span>
		<span class="input-wrapper">
			<input type="radio" name="text-transform" value="lowercase" title="Lowercase" data-prop="text-transform" />
			<span>ab</span>
		</span>
		<span class="input-wrapper">
			<input type="radio" name="text-transform" value="capitalize" title="Capitalize" data-prop="text-transform" />
			<span>Ab</span>
		</span>
		<span class="input-wrapper">
			<input type="radio" name="text-transform" value="none" title="Original" data-prop="text-transform" />
			<span>Aa</span>
		</span>
	`,
};

export default Index;