const html = `
	<section part="module-section">
		<header part="module-header">
			<h5 part="module-title">Tag</h5>
			<kia-button data-icon="ellipsis-solid-full-symbol" style="display:none;"></kia-button>
		</header>

		<div part="module-row">
			
			<div part="module-col w100">
				<kia-select class="switch-tag" data-name="changeTagName" data-id="switch-tag" data-node-group="">
					<details part="details" class="select-wrapper">
						<summary part="summary" class="select-trigger">Section</summary>
						<ul class="select-options scroll-design" part="select-options" style="width: 100%;top: calc(100% + 5px);transform: none;">						
						  <li class="select-option" part="selection-option container" value="DIV">div</li>
						  <li class="select-option selected" part="selection-option container" value="SECTION">section</li>
						  <li class="select-option" part="selection-option container" value="HEADER">header</li>
						  <li class="select-option" part="selection-option container" value="FOOTER">footer</li>
						  <li class="select-option" part="selection-option container" value="MAIN">main</li>
						  <li class="select-option" part="selection-option container" value="ARTICLE">article</li>

						  <li class="select-option" part="selection-option text" value="P">p</li>						  
						  <li class="select-option" part="selection-option text" value="H1">h1</li>
						  <li class="select-option" part="selection-option text" value="H2">h2</li>
						  <li class="select-option" part="selection-option text" value="H3">h3</li>						  
						  <li class="select-option" part="selection-option text" value="H4">h4</li>						  
						  <li class="select-option" part="selection-option text" value="H5">h5</li>						  
						  <li class="select-option" part="selection-option text" value="H6">h6</li>						  
						  <li class="select-option" part="selection-option text" value="BLOCKQUOTE">blockquote</li>						  
						  <li class="select-option" part="selection-option text" value="PRE">pre</li>						  
						  <li class="select-option" part="selection-option text" value="CODE">code</li>						  
						  <li class="select-option" part="selection-option text" value="ADDRESS">Address</li>						  
						  
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