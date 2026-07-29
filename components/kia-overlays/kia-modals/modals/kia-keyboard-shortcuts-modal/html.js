const html = `
	<section class="section">
		<header class="header">
			<h4 class="title">Keyboard Shortcuts</h2>
			<kia-button data-icon="x-solid-symbol" data-event="closeModal"></kia-button>
		</header>
		
		<div class="kshortcuts">
			<div class="kshortcuts-colm">
				<h4 class="kshortcuts-title">Tools</h4>
				<ul class="kshortcuts-items">
					<li class="kshortcuts-item move-tool">
						<svg class="upload-icon" xmlns="http://www.w3.org/2000/svg"><use href="assets/images/svg-icons.svg#location-arrow-solid-full-symbol"></use></svg>
						<span class="kshortcuts-item-name">Move Tool</span>
						<kbd>V</kbd>
					</li>
					<li class="kshortcuts-item">
						<svg class="upload-icon" xmlns="http://www.w3.org/2000/svg"><use href="assets/images/svg-icons.svg#code-solid-full-symbol"></use></svg>
						<span class="kshortcuts-item-name">Section/Tags Tool</span>
						<kbd>F</kbd>
					</li>
					<li class="kshortcuts-item">
						<svg class="upload-icon" xmlns="http://www.w3.org/2000/svg"><use href="assets/images/svg-icons.svg#type-symbol"></use></svg>
						<span class="kshortcuts-item-name">Text Tool</span>
						<kbd>T</kbd>
					</li>
					<li class="kshortcuts-item">
						<svg class="upload-icon" xmlns="http://www.w3.org/2000/svg"><use href="/assets/images/svg-icons.svg#magnifying-glass-solid-full-symbol"></use></svg>
						<span class="kshortcuts-item-name">Zoom Tool</span>
						<kbd>Z</kbd>
					</li>	
					<li class="kshortcuts-item">
						<svg class="upload-icon" xmlns="http://www.w3.org/2000/svg"><use href="/assets/images/svg-icons.svg#hand-solid-full-symbol"></use></svg>
						<span class="kshortcuts-item-name">Hand Tool</span>
						<kbd>H</kbd>
					</li>					
				</ul>	
			</div>
			<div class="kshortcuts-colm">
				<h4 class="kshortcuts-title">Selection</h4>
				<ul class="kshortcuts-items">
					<li class="kshortcuts-item">
						<svg class="upload-icon" xmlns="http://www.w3.org/2000/svg"><use href="assets/images/svg-icons.svg#bring-to-front-symbol"></use></svg>
						<span class="kshortcuts-item-name">Bring To Front</span>
						<kbd>]</kbd>
					</li>
					<li class="kshortcuts-item">
						<svg class="upload-icon" xmlns="http://www.w3.org/2000/svg"><use href="assets/images/svg-icons.svg#send-to-back-symbol"></use></svg>
						<span class="kshortcuts-item-name">Send To Back</span>
						<kbd>[</kbd>
					</li>
					<li class="kshortcuts-item lock-tool">
						<svg class="upload-icon" xmlns="http://www.w3.org/2000/svg"><use href="assets/images/svg-icons.svg#lock-symbol"></use></svg>
						<span class="kshortcuts-item-name">Lock/Unlock</span>
						<kbd>Ctrl+Shift+L</kbd>
					</li>
					<li class="kshortcuts-item lock-tool">
						<svg class="upload-icon" xmlns="http://www.w3.org/2000/svg"><use href="assets/images/svg-icons.svg#eye-symbol"></use></svg>
						<span class="kshortcuts-item-name">Hide/Show</span>
						<kbd>Ctrl+Shift+H</kbd>
					</li>
					<li class="kshortcuts-item lock-tool">
						<svg class="upload-icon" xmlns="http://www.w3.org/2000/svg"><use href="assets/images/svg-icons.svg#clone-solid-full-symbol"></use></svg>
						<span class="kshortcuts-item-name">Duplicate</span>
						<kbd>Ctrl+D</kbd>
					</li>									
				</ul>	
			</div>
		</div>
	</section>
`;

export default html;