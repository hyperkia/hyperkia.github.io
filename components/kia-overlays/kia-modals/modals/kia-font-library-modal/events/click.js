import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

    static handler(e) {
        if(props.eRTAction === 'closeModal') props.root.close();;
        if(props.eTarget.closest('.tabmenu-item')) this.switchTab();
        if(props.eTarget.matches('[data-action="add"]')) this.addProjectFont();
        if(props.eTarget.matches('[data-action="delete"]')) this.deleteProjectFont();
        if(props.eTarget.matches('[data-event="switchToLibraryFonts"]')) this.switchTab('library');
    }

    static switchTab(targetTab = null){
        const target = targetTab || props.eTarget.dataset.target;
        props.root._qs('.tabmenu-item.active')?.classList.remove('active');
        props.root._qs('.tabcontent.active')?.classList.remove('active');
        props.root._qs(`[data-target="${target}"]`).classList.add('active');
        props.root.$id[target].classList.add('active');
    }

    static addProjectFont(){
        props.eTarget.dataset.action = 'added';
        const f = props.eTarget.dataset.fontName;
        const fonts = {
            [f]: KIA.data.fonts.getFont('google', f),
        };
        KIA.actions.kiaFontLibraryModal.addProjectFont(fonts);
        methods.showProjectFonts();
    }

    static deleteProjectFont(){
        const f = props.eTarget.dataset.fontName;
        KIA.actions.kiaFontLibraryModal.deleteFontFromDownload(f);
        const fontItemEl = props.eTarget.closest('.font-item');
        fontItemEl.classList.add('deleting');
        setTimeout(()=>{            
            fontItemEl.remove();
        },500);
    }

}

export default Index;