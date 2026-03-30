const html = `
	<section part="module-section">
		<header part="module-header">
			<h5 part="module-title">Tag</h5>
			<kia-button data-icon="ellipsis-solid-full-symbol" style="display:none;"></kia-button>
		</header>

		<div part="module-row">
			
			<div part="module-col w100">
				<kia-select class="switch-tag" data-name="changeNodeName" data-id="switch-tag">
					<details part="details" class="select-wrapper">
						<summary part="summary" class="select-trigger">Section</summary>
						<ul class="select-options scroll-design" style="width: 100%;top: calc(100% + 5px);transform: none;">						
						  <li class="select-option" part="selection-option section" value="div">div</li>
						  <li class="select-option selected" part="selection-option section" value="section">section</li>
						  <li class="select-option" part="selection-option section" value="header">header</li>
						  <li class="select-option" part="selection-option section" value="footer">footer</li>
						  <li class="select-option" part="selection-option section" value="main">main</li>
						  <li class="select-option" part="selection-option section" value="article">article</li>

						  <li class="select-option" part="selection-option text" value="p">p</li>
						  <li class="select-option" part="selection-option text" value="span">span</li>
						  <li class="select-option" part="selection-option text" value="h1">h1</li>
						  <li class="select-option" part="selection-option text" value="h2">h2</li>
						  <li class="select-option" part="selection-option text" value="h3">h3</li>
						  <li class="select-option" part="selection-option text" value="small">small</li>
						  <li class="select-option" part="selection-option text" value="strong">strong</li>
						  <li class="select-option" part="selection-option text" value="em">em</li>
						  <li class="select-option" part="selection-option text" value="a">a</li>
						  
						  <li class="select-option" part="selection-option others" value="others"></li>
						</ul>
					</details>
				</kia-select>
				<textarea data-id="tag-innerText" class="tag-innertext" data-event="tagInnerText" placeholder="Type here..."></textarea>
			</div>
			
			<div part="module-col w79" class="tag-src-colm">
				<input data-id="tag-src" class="tag-src" data-event="tagSrc" type="text" placeholder="url">
			</div>
			<div class="upload-asset-colm" part="module-col module-last-btn-col w16">				
				<kia-button class="upload-asset-btn" data-icon="upload-solid-full-symbol" data-event="setTagSrc" title="Upload"></kia-button>
			</div>
		</div>
	</section>
`;

export default html;