const html = `
	<section class="section">
		<header class="header">
			<h4 class="title"><a class="title-link" href="https://github.com/FortAwesome/Font-Awesome" target="_blank">Google Fonts (Open Source)</a></h2>
			<kia-button data-icon="x-solid-symbol" data-event="closeModal"></kia-button>
		</header>
		<article class="tab">
			<div class="tabmenu">													
				<span class="tabmenu-item active" data-target="downloaded" data-class="tabmenu-item">Downloaded Fonts</span>
				<span class="tabmenu-item" data-target="library" data-class="tabmenu-item">Library Fonts</span>				
				<input class="font-search" type="search" placeholder="Search..." data-id="fontSearch">
			</div> 
			<div class="tabcontents">
				<div class="tabcontent active" data-id="downloaded">
					<ul class="font-items scroll-design" data-id="downloaded-fonts"></ul>
					<strong class="nofont-text">No Fonts Available, <br> To add fonts click on <u data-event="switchToLibraryFonts">"Library Fonts"</u>.</strong>
				</div>				
				<div class="tabcontent" data-id="library">
					<ul class="font-items scroll-design" data-id="library-fonts"></ul>
					<strong class="nofont-text">No fonts found for "<span class="search-fount-name"></span>" <br> Try a different spelling or browse similar fonts</strong>
				</div>				
			</div>
		</article>
	</section>
`;

export default html;