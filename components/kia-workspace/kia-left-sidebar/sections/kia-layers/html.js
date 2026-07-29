const html = `
	<section class="section">
		<header>
			<h5>Layers</h5>
		</header> 
		<article class="layers scroll-design" data-id="layers">
			
			<template data-id="node-template">
				<div class="node" data-item="">
				    <div class="header" data-children=""></div>
				    <div class="childrens"></div>
			    </div>			
			</template>

			
			<div class="item-content" data-id="itemContent">
				<span class="show-children-btn"></span>
				<span class="title">Page 1</span>
				<span class="item-visible"></span>
				<span class="item-lock"></span>
			</div>

			<div class="drag-node-ghost" data-id="dragNodeGhost">Header</div>
							
		</article>		
	</section>
`;

export default html;


