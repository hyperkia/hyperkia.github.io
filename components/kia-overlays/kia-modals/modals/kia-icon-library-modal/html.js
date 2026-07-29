const html = `
	<section class="section" data-id="wrapper">
	  <header class="header">
	    <h4 class="title"><a class="title-link" href="https://github.com/FortAwesome/Font-Awesome" target="_blank">Font Awesome Free Icons</a></h2>
	    <input class="icon-search" type="search" data-id="search-icon" placeholder="Search...">
		<kia-button data-icon="x-solid-symbol" data-event="closeModal"></kia-button>
	  </header>
	  <div class="icon-items scroll-design" data-id="icon-items"></div>
	  <strong class="noicon-text">No icon found for "<span class="search-icon-name"></span>" <br> Try a different spelling or browse similar icons</strong>
	 </section>
`;

export default html;