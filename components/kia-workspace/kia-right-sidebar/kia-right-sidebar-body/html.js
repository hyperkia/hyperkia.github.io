
import './kia-design-module/index.js';
import './kia-code-module/index.js';

const html = `
	<section class="section">
		<header class="header">
			<div class="tab-links">				
				<kia-button class="active iconbtn" data-class="tab-link" data-tab-target="design" data-icon="palette-solid-full-symbol"></kia-button>
				<kia-button class="active iconbtn" data-class="tab-link" data-tab-target="code" data-icon="code-solid-full-symbol"></kia-button>
			</div>
			<kia-button class="flip-sidebar-btn" data-icon="sidebar-symbol" data-id="flip-sidebar"></kia-button>
		</header>	

		<div class="tab-contents" data-active-tab="design">		
			<kia-design-module></kia-design-module>
			<kia-code-module></kia-code-module>
		</div>
	</section>
`;

export default html;