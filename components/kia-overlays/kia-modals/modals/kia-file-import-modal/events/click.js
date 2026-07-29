import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

    static handler(e) {
        if (props.eRTAction === 'closeModal') props.root.close();
        if (props.eTAction === 'importFromUrl') this.importFromUrl();
        if (props.eTarget.closest('.tabmenu-item')) this.switchTab();
    }

    static switchTab(targetTab = null) {
        const target = targetTab || props.eTarget.dataset.target;
        props.root._qs('.tabmenu-item.active')?.classList.remove('active');
        props.root._qs('.tabcontent.active')?.classList.remove('active');
        props.root._qs(`[data-target="${target}"]`).classList.add('active');
        props.root.$id[target].classList.add('active');
    }

    static async importFromUrl() {
        props.root.$id.importFromUrlBtn.innerText = 'Please Wait ...';
        props.root.$id.importFromUrlBtn.classList.add('disable');
        const url = props.root.$id.fromurlInput.value;
        const response = await fetch("./backend/fetch-html.php?url=" + encodeURIComponent(url));
        const rawhtml = await response.text();        
        KIA.transformer.htmlToObject.parse(rawhtml,url).then((response)=>{          
            props.root.close();
            KIA.actions.kiaFileImportModal.importProject(response);
            props.root.$id.importFromUrlBtn.innerText = 'Import';
            props.root.$id.importFromUrlBtn.classList.remove('disable');
        })
    }

}

export default Index;