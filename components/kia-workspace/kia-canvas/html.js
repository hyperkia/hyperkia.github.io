
import '../kia-canvas-tools/index.js';

const html = `
	<style data-id="style"></style>
	<link rel="stylesheet" href="/assets/css/font-awesome-6.5.0-css-all.min.css">
	
	<div data-id="pages" class="pages" data-event="canvasZoom"></div>
	<template data-id="page-item-template">
		<div class="page" data-page="" data-lock="" draggable="false"></div>
	</template>

	
	<div data-id="page-names" class="page-names"></div>
	<template data-id="page-name-template">
		<span class="page-name" data-page-name=""></span>
	</template>

	
	<div class="dimension-indicator" data-id="dimension-indicator"></div>

	
	<div data-id="canvas-selection" class="canvas-selection"></div>	
	<svg class="active-layers-outline-svg">
	  <defs>
	    <clipPath id="active-layers-outline-clippath">
	      <path d="M50 50 H150 V150 H50 Z" data-id="active-layers-outline-mask" />
	    </clipPath>
	  </defs>
		<path clip-path="url(#active-layers-outline-clippath)" class="active-layers-outline" data-id="active-layers-outline" data-selection="0" vector-effect="non-scaling-stroke" shape-rendering="crispEdges"></path>
	</svg>


	<svg viewBox="0 0 1200 800" style="width:0px;height:0px;" xmlns="http://www.w3.org/2000/svg">
		<defs data-id="gradient-registry-defs"></defs>
	</svg>
`;

export default html;