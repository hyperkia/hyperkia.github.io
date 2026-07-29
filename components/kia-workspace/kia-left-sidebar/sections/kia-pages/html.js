const html = `
	<section class="section">
		<header class="header">
			<h5>Pages</h5>
			<kia-button class="add-new-page-button" data-icon="plus-solid-symbol" data-event="addNewPage"></kia-button>
		</header> 
		<article class="page-items-wrapper scroll-design">
			<ul class="page-items" data-id="page-items"></ul>
			<template data-id="page-item-template">
				<li class="page-item">
	 				<span class="page-name" data-event="editPageName">Page 1</span>
	 				<span class="page-visible mask-image" data-event="pageVisible"></span>
	 				<span class="page-lock mask-image" data-event="pageLock"></span>
	 			</li> 
			</template>
		</article>		
	</section>
`;

export default html;