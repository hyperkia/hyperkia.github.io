import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

    static handler(e) {
        if(props.eTarget.dataset.id === 'fontSearch') this.fontSearch();
    }

    static fontSearch(){
        const value = props.root.$id.fontSearch.value.trim();
        props.root.style.setProperty('--search-fount-name', `"${value}"`);

        if(value.length < 2) {
            props.root.$id.libraryFonts.innerHTML = '';
            methods.loadFonts();
            return;
        }
        
        const l = props.googleFonts.length;
        const fonts = [];
        for(let i=0; i<l; i++) {            
            const f = props.googleFonts[i];
            if(f.toLowerCase().trim().includes(value.toLowerCase().trim())) {
                fonts.push(f);
            }
            if(fonts.length === 20) break;            
        }

        const htmlFonts = methods.getFontsHtml({fonts, action: 'add'});
        props.root.$id.libraryFonts.innerHTML = htmlFonts;

        const importCss = methods.get400FontsImportCss(fonts);
        props.root.$id.fontStyleEl.innerText = importCss;
    }

}

export default Index;