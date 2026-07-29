
import methods from '../utils/methods/index.js';

async function Index() {
    const exportData = {
        pageInnerHtml: {},
        style: '',
    };

    const db = KIA.services.idb.core.db;
    exportData.database = {
        name: db.name,
        version: db.version,
        objectStoreNames: [...db.objectStoreNames]
    }

    exportData.assets = await KIA.utils.file.filesToExportJSON(
        KIA.state.assets.getAssets()
    );

    exportData.pages = KIA.state.pages.getPages();
    for(let [pId, pObj] of Object.entries(exportData.pages)) {
        exportData.pageInnerHtml[pId] = KIA.canvasRefMap[pId].innerHTML;
    }
    exportData.style = KIA.kiaCanvas.$id.style.textContent;

    const layers = structuredClone(KIA.state.layers.getLayers());
    for(let [lId, lObj] of Object.entries(layers)) {
        const maskImageAssetId = lObj.style['mask-image'];        
        const assetObj = maskImageAssetId && KIA.state.assets.getAssets()[maskImageAssetId];
        if(!assetObj) continue;
        const dataUrl = await KIA.utils.file.blobUrlToDataURL(assetObj.url);
        lObj.style['mask-image'] = `url("${dataUrl}")`;
        lObj.style['-webkit-mask-image'] = `url("${dataUrl}")`;
    }

    exportData.layers = layers;
    
    exportData.canvas = {
        projectFontsStyle: KIA.kiaCssTypography.$id.importFontsStyleEl.innerHTML,
        canvasStyle: KIA.state.canvas.getProp('style'),
        children: KIA.state.canvas.getProp('children'),
        projectFonts: KIA.state.canvas.getProp('projectFonts'),
        dataStructure: KIA.state.canvas.getProp('dataStructure'),
        createdAt: KIA.state.canvas.getProp('createdAt'),
        updatedAt: KIA.state.canvas.getProp('updatedAt'),
    };

    methods.exportProject(exportData);
}

export default Index;