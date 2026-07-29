const html = `
	<section class="section">
		<header class="header">
			<kia-button class="" data-icon="bars-solid-full-symbol" data-event="toggleMenuVisibility"></kia-button>
			<nav class="nav" data-id="nav">
				<ul class="menu-items">					
					<li class="menu-item" data-lavel="1">
						File
						<ul class="menu-items sub-menu-items">
							<li class="menu-item" data-lavel="2" data-action="fileimport">Import</li>
							<li class="menu-item" data-lavel="2" data-action="fileexport">Export</li>
						</ul>	
					</li>					
					<li class="menu-item" data-lavel="1">
						Window
						<ul class="menu-items sub-menu-items">
							<li class="menu-item hidden" data-lavel="2" data-action="seo">SEO</li>
							<li class="menu-item" data-lavel="2" data-action="fontSearchReplace">Missing Font Search & Replace</li>
							<li class="menu-item" data-lavel="2" data-action="addProjectFont">Add Font</li>						
							<li class="menu-item" data-lavel="2" data-action="moreIcons">Icons</li>							
						</ul>	
					</li>	
					<li class="menu-item" data-lavel="1">
						Preferences
						<ul class="menu-items sub-menu-items">
							<li class="menu-item" data-lavel="2">
								Theme
								<ul class="menu-items sub-menu-items">
									<li class="menu-item" data-lavel="3" data-action="preferenceThemeSystem">System</li>
									<li class="menu-item" data-lavel="3" data-action="preferenceThemeDark">Dark</li>						
									<li class="menu-item" data-lavel="3" data-action="preferenceThemeLight">Light</li>						
								</ul>
							</li>
							<li class="menu-item" data-lavel="2" data-action="preferenceKeyboardShortcuts">Keyboard Shortcuts…</li>								
						</ul>	
					</li>					
				</ul>	
			</nav>
			<kia-button class="sidebar-btn hidden" data-icon="sidebar-symbol" data-event="flipSidebar"></kia-button>
		</header>
	</section>
`;

export default html;