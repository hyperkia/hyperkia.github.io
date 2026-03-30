import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

    static handler(e) {
        if (props.eRTAction === 'closeModal') KIA.actions.kiaModals.closeModal();
        if (props.eTAction === 'closeModal') KIA.actions.kiaModals.closeModal();
        if (props.eTAction === 'resolveFont') this.resolveFont();
    }

    static resolveFont(){        
        [...props.root.$id.missingItems.children].forEach((el)=>{
            const key = el.dataset.font;
            if(!props.fonts[key].status) {
                props.fonts[key].newName = el.querySelector('.available-fonts').value;
                props.fonts[key].status = true;
            }
        });
 
        
        KIA.transformer.fontsToObject(props.fonts).then((response)=>{
            const resolveFonts = {};
            const projectFonts = {};
            const fontsBlob = {};
            for(let k in props.fonts) {
                resolveFonts[props.fonts[k].name] = props.fonts[k].newName;
                projectFonts[props.fonts[k].newName] = props.fonts[k].varients;
                if(props.fonts[k].data instanceof File) fontsBlob[props.fonts[k].newName] = props.fonts[k].data;
            }
            KIA.actions.kiaMissingFontsModal.resolveFont(resolveFonts);
            KIA.actions.kiaFontLibraryModal.addProjectFont(projectFonts);
            KIA.actions.kiaMissingFontsModal.uploadFonts(fontsBlob);
        })
    }
}

export default Index;