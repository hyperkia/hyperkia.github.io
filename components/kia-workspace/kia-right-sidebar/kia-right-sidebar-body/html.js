
import './sections/kia-design-module/index.js';
import './sections/kia-code-module/index.js';

const html = `
	<section class="section">
		<header class="header">
			<div class="tabmenu">				
				<kia-button class="tabmenu-item iconbtn" data-class="tab-link" data-target="design" data-icon="palette-solid-full-symbol"></kia-button>
				<kia-button class="tabmenu-item iconbtn" data-class="tab-link" data-target="code" data-icon="code-solid-full-symbol"></kia-button>
			</div>
			<kia-button class="flip-sidebar-btn hidden" data-icon="sidebar-symbol" data-id="flip-sidebar"></kia-button>
		</header>	

		<div class="tab-contents">		
			<kia-design-module class="tab-content active" data-id="designTabContent"></kia-design-module>
			<kia-code-module class="tab-content" data-id="codeTabContent"></kia-code-module>
		</div>
	</section>
`;

export default html;