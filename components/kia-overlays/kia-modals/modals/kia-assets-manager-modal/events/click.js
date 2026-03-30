import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

    static handler(e) {
        if (props.eRTAction === 'closeModal') KIA.actions.kiaModals.closeModal();
        if (props.eTarget.closest('.tabmenu-item')) this.switchTab();
        if (props.eTarget.closest('[data-asset]')) this.assetSelected();
    }

    static switchTab(targetTab = null) {
        const target = targetTab || props.eTarget.dataset.target;
        props.root._qs('.tabmenu-item.active')?.classList.remove('active');
        props.root._qs('.tabcontent.active')?.classList.remove('active');
        props.root._qs(`[data-target="${target}"]`).classList.add('active');
        props.root.$id[target].classList.add('active');
        if(target === 'medialibrary') KIA.dom.kiaAssetsManagerModal.renderAssetList();
    }

    static assetSelected(){
        const key = props.eTarget.closest('[data-asset]').dataset.asset;
        KIA.actions.kiaAssetsManagerModal.selectAsset(key);
        KIA.actions.kiaModals.closeModal();
    }

}

export default Index;