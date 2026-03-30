const html = `
	<section class="section">
		<header class="header">
			<h4 class="title">Import</h2>
			<kia-button data-icon="x-solid-symbol" data-event="closeModal"></kia-button>
		</header>
		<article class="tab">
			<div class="tabmenu">													
				<!--
				<span class="tabmenu-item active" data-target="uploadfile" data-class="tabmenu-item">Upload File</span>
				<span class="tabmenu-item" data-target="fromurl" data-class="tabmenu-item">From URL</span>
				-->
			</div> 
			<div class="tabcontents">
				<div class="tabcontent active" data-id="uploadfile">
					<div class="upload-sec">
						<svg class="upload-icon" xmlns="http://www.w3.org/2000/svg">
							<use href="assets/images/svg-icons.svg#upload-solid-full-symbol"></use>
						</svg>
						<h3 class="upload-title">Choose a file or drag & drop it here</h3>
						<div class="upload-format">Hyperkia ZIP Format</div>
						<span class="upload-btn">Browse File</span>
						<input class="upload-input" data-id="uploadFileInput" type="file" data-event="uploadFileInput">
					</div>
				</div>
				<div class="tabcontent" data-id="fromurl">
					<div class="fromurl-sec">
						<h3 class="fromurl-title">Import from Website</h3>
						<div class="fromurl-input-wrapper">
							<input class="fromurl-input" data-id="fromurlInput" type="url" placeholder="Enter website URL" value="">
							<button class="fromurl-btn loader" data-event="importFromUrl" data-id="importFromUrl-btn">Import</button>
						</div>
					</div>
				</div>				
			</div>
		</article>
	</section>
`;

export default html;