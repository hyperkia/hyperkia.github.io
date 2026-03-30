import audio from './audio.js';
import iframe from './iframe.js';
import img from './img.js';
import picture from './picture.js';
import svg from './svg.js';
import video from './video.js';
import richtext from './richtext.js';
import text from './text.js';
import other from './other.js';

import props from '../../../utils/props.js';

function Index(){
	const l = props.activeParseLayer.layer;
	const n = l.nodeName;

	if(n === 'AUDIO') return audio();
	if(n === 'IFRAME') return iframe();
	if(n === 'IMG') return img();
	if(n === 'PICTURE') return picture();
	if(n === 'SVG') return svg();
	if(n === 'VIDEO') return video();	
	if(l.childElementCount === 0 && l.childNodes.length === 0) return other();
	if(l.childElementCount === l.childNodes.length) return other();
	if ([...l.childNodes].some(n=> n.nodeType===3 && n.data.trim()) && l.childElementCount === 0) return text();
	if ([...l.childNodes].some(n=> n.nodeType===3 && n.data.trim()) && l.childElementCount) return richtext();
	
}


export default Index;
