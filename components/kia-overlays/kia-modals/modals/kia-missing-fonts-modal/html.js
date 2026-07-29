const html = `
	<section class="section">
		<header class="header">
			<h4 class="title">Font Search & Replace</h2>
			<kia-button data-icon="x-solid-symbol" data-event="closeModal"></kia-button>
		</header>
		
		<article class="body">
			<div class="content">			
				<p>Some fonts used in this design are not available on your system. To keep the layout accurate, please choose a replacement font.</p>
				<div class="missing-items" data-id="missing-items"></div>
				<!-- <template data-id="missing-item-template">
					<div class="missing-item">
						<span class="missing-font">Poppins</span>
						<kia-select class="available-fonts">
							<details part="details" class="select-wrapper">
								<summary part="summary" class="select-trigger">Section</summary>
								<ul class="select-options scroll-design" style="width: 100%;top: calc(100% + 5px);transform: none;">						
								  <li class="select-option" part="selection-option section" value="div">div</li>
								  <li class="select-option selected" part="selection-option section" value="section">section</li>								  
								</ul>
							</details>
						</kia-select>
					</div>
				</template>	-->
			</div>
		</article>

		<footer>
			<button class="actionbtn action-cancel" data-event="closeModal">Cancel</button>
			<button class="actionbtn action-resolve" data-event="resolveFont">Resolve</button>
		</footer>
	</section>
`;

export default html;