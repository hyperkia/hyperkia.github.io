const html = `
	<section class="section">
		<header class="header">
			<h4 class="title">Assets</h2>
			<kia-button data-icon="x-solid-symbol" data-event="closeModal"></kia-button>
		</header>
		<article class="tab">
			<div class="tabmenu">													
				<span class="tabmenu-item active" data-target="uploadfile" data-class="tabmenu-item">Upload File</span>
				<span class="tabmenu-item" data-target="medialibrary" data-class="tabmenu-item">Media Library</span>
			</div> 
			<div class="tabcontents">
				<div class="tabcontent active" data-id="uploadfile">
					<div class="upload-sec">
						<svg class="upload-icon" xmlns="http://www.w3.org/2000/svg">
							<use href="assets/images/svg-icons.svg#upload-solid-full-symbol"></use>
						</svg>
						<h3 class="upload-title">Choose a file or drag & drop it here</h3>						
						<span class="upload-btn">Browse File</span>
						<input multiple class="upload-input" data-id="uploadFileInput" type="file" data-event="uploadFileInput">
					</div>
				</div>
				<div class="tabcontent" data-id="medialibrary">
					<div class="medialibrary-sec">
						<div class="medialibrary-items" data-id="medialibraryItems"></div>
						<button class="load-more-assets-btn" data-event="loadMoreAssets" data-id="loadMoreAssets">Load More</button>
					</div>
				</div>				
			</div>
		</article>
	</section>
`;

export default html;