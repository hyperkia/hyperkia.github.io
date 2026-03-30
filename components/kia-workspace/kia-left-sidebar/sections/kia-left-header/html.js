const html = `
	<section class="section">
		<header class="header">
			<kia-button data-icon="bars-solid-full-symbol" data-event="toggleMenuVisibility"></kia-button>
			<nav class="nav" data-id="nav">
				<ul class="menu-items">					
					<li class="menu-item" data-lavel="1">
						File
						<ul class="menu-items sub-menu-items">
							<li class="menu-item" data-lavel="2" data-action="fileimport">Import</li>
							<li class="menu-item" data-lavel="2" data-action="fileexport">Export</li>
						</ul>	
					</li>
					<!--
					<li class="menu-item" data-lavel="1">Themes</li>
					<li class="menu-item" data-lavel="1">Plugins</li>
					<li class="menu-item" data-lavel="1">Settings</li>
					<li class="menu-item" data-lavel="1">Help</li>
					-->
				</ul>	
			</nav>
			<kia-button class="sidebar-btn" data-icon="sidebar-symbol" data-event="flipSidebar"></kia-button>
		</header>
	</section>
`;

export default html;