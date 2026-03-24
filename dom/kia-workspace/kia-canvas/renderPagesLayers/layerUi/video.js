function Index(l) {
    if (l.plateform === 'youtube') {
        const src = KIA.utils.string.mapYouTubeUrlToEmbedUrl(l.attrs.src);
        return `
        	<div class="canvas-layer videohtml" data-layer="${l.key}" draggable="false">
				<iframe width="100%" height="100%" src="${src}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
			</div>
		`;
    } else {
        let sourceHtml = '';
        const srcArr = Array.isArray(l.attrs.src) ? l.attrs.src : [l.attrs.src];
        srcArr.forEach((s)=>{
            sourceHtml += `<source src="${s.src}" type="${s.type}">`
        })

        let attrs = '';
        if(l.attrs.autoplay) attrs += ' autoplay';
        if(l.attrs.muted) attrs += ' muted';
        if(l.attrs.playsinline) attrs += ' playsinline';
        if(l.attrs.loop) attrs += ' loop';

        return `
            <video class="canvas-layer videohtml" ${attrs} data-layer="${l.key}" draggable="false">>
                ${sourceHtml}
            </video>
        `;
    }
}

export default Index;