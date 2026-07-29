const html = `
	<section class="section">
		<header class="header">
			<div class="menu-items">
				<a class="active menu-item-file" href="#">
					File				
					<svg xmlns="http://www.w3.org/2000/svg"><use href="assets/images/svg-icons.svg#file-symbol"></use></svg>
				</a>
				<a class="menu-item-image" href="#">
					Assets				
					<svg xmlns="http://www.w3.org/2000/svg"><use href="assets/images/svg-icons.svg#image-symbol"></use></svg>
				</a>
			</div> 
			<div class="search-box" data-id="search-box">
				<kia-button class="showsearch-button" data-event="showSearch" data-icon="magnifying-glass-solid-full-symbol"></kia-button>
				<kia-button class="hidesearch-button" data-event="hideSearch" data-icon="x-solid-symbol"></kia-button>
				<input class="search-input" data-id="search-input" type="search" placeholder="Search..." />
			</div>
		</header>
	</section>
`;

export default html;