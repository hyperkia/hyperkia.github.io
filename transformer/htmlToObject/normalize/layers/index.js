
import props from '../../utils/props.js';
import type from './type/index.js';
import base from './base.js';


function isusedLayer(l) {
	if(l.closest('[data-htmlparse]')) return;
	const s = props.activeParseLayer.layerStyle;
	if (['HTML', 'LINK', 'HEAD', 'META', 'SCRIPT', 'TITLE', 'NOSCRIPT', 'STYLE', 'TEMPLATE'].includes(l.nodeName)) return;
    if (l.offsetWidth === 0 || l.offsetHeight === 0) return;
    if(s.opacity === '0') return;
    if(s.visibility === 'hidden') return;
    if(s.display === 'none') return;

	let isUsed = false;
	if ([...l.childNodes].some(n=> n.nodeType===3 && n.data.trim())) isUsed = true;
	if (s['background-color'] !== 'rgba(0, 0, 0, 0)') isUsed = true;
	if (s['background-image'] !== 'none') isUsed = true;
	if(s['border-width']) isUsed = true;
	if (l.src) isUsed = true;
	if (l.nodeName === 'VIDEO') isUsed = true;
	if (l.classList.toString().indexOf('fa-')>=0) isUsed = true;

    return isUsed;
}

function Index(){
	const layers = {};
	const layersOrder = [];
    const bodyEl = props.iframeEl.contentDocument.querySelector('body');

    const walker = document.createTreeWalker(
	    bodyEl,
	    NodeFilter.SHOW_ELEMENT
	);

	let l;
	const pageKey = props.activeParseLayer.pageKey;
	props.activeParseLayer.length = bodyEl.querySelectorAll('*').length;
	while(l = walker.nextNode()){
		props.activeParseLayer.layerStyle = window.getComputedStyle(l);
	    if(!isusedLayer(l)) continue;

	    props.activeParseLayer.layer = l;
	    const layerObj = base();
	    const parseData = type();
	    const key = crypto.randomUUID();
	    layersOrder.push(key);
	    layerObj.key = key;
	    layerObj.pId = pageKey;

	    if(parseData?.attrs) Object.assign(layerObj.attrs, parseData.attrs);
	    if(parseData?.css) Object.assign(layerObj.css, parseData.css);		
	    if(parseData?.innerText) layerObj.innerText = parseData.innerText;
        layers[key] = layerObj;        
	}	

    return {layers, layersOrder};
}

export default Index;