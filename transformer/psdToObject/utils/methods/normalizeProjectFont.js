
import props from '../props.js';

function Index(){
	const fonts = {};
	const projectFonts = {};
	[...props.fonts].forEach((f)=>{
		const normFont = KIA.utils.font.getFontFamily(f);
		const gFont = KIA.data.fonts.getFont('google', normFont);
        if(!gFont) return;
		projectFonts[normFont] = gFont;
	});

	for (const [lId, lObj] of Object.entries(props.parse.layers)) {
   
        if (lObj.textContent) {

            // Layer textContent
            const parser = new DOMParser();
            const doc = parser.parseFromString(lObj.textContent, "text/html");
            const els = doc.querySelectorAll("*");

            els.forEach((el) => {
                const elFont = KIA.utils.font.getFontFamily(el.style.fontFamily);
                if(!elFont) return;
                if (elFont && projectFonts[elFont]) {                    
                    el.style.fontFamily = elFont;
                }
            });
            lObj.textContent = doc.body.innerHTML;

            // Layer
            const layerFont = KIA.utils.font.getFontFamily(lObj.style['font-family']);
            if (layerFont && projectFonts[layerFont]) {            	
            	lObj.style['font-family'] = layerFont;
            }

        }      
    }

    props.parse.canvas.projectFonts = projectFonts;
}

export default Index;