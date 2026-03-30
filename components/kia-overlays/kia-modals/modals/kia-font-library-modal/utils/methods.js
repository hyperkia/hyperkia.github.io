import props from '../utils/props.js';


const Index = {

    loadFonts() {
        if(!props.googleFonts) props.googleFonts = KIA.data.fonts.getFontsName('google');

        const startIndex = props.root.$id.libraryFonts.children.length;
        const endIndex = startIndex + 15;
        
        const fonts = [];
        let html = '';
        for (let i = startIndex; i <= endIndex; i++) {            
            fonts.push(props.googleFonts[i]);
        }
        
        const htmlFonts = this.getFontsHtml({fonts, action: 'add'});
        props.root.$id.libraryFonts.insertAdjacentHTML('beforeend', htmlFonts);
        const importCss = this.get400FontsImportCss(fonts);
        props.root.$id.fontStyleEl.innerText += importCss;
    },

    scrollEndFetchMoreFonts() {
        const lastChild = props.root.$id.libraryFonts.lastElementChild;
        if (!lastChild) return;
        const lastChildRect = KIA.utils.dom.getRect(lastChild);
        if (document.body.offsetHeight > lastChildRect.top) this.loadFonts();
    },

    get400FontsImportCss(fonts) {
    	let fontImport = '';
        fonts.forEach((f)=>{
            fontImport += `@import url(https://fonts.googleapis.com/css2?family=${f.replaceAll(' ','+')}:wght@400&display=swap);`;
        })
        return fontImport;
    },

    getFontsHtml(args){
        const html = [];
        args.fonts.forEach((f)=>{
            html.push(`
                <li class="font-item" style="font-family: '${f}', sans-serif;">
                    <h4 class="font-item-title">
                        ${f}
                        <button class="font-item-button" data-action="${args.action || ''}" data-font-name="${f}"></button>
                    </h4>
                    <p class="font-item-uppercase" contenteditable="true" spellcheck="false">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
                    <p class="font-item-lowercase" contenteditable="true" spellcheck="false">abcdefghijklmnopqrstuvwxyz</p>
                    <p class="font-item-numbers" contenteditable="true" spellcheck="false">013456789</p>              
                </li>
            `);
        });
        return html.join('');        
    },

    showProjectFonts(){
        const htmlFonts = this.getFontsHtml({fonts: Object.keys(KIA.state.canvas.projectFonts), action: 'delete'});
        props.root.$id.downloadedFonts.innerHTML = htmlFonts;
    }

};

export default Index;