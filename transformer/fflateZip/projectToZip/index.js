
import methods from '../utils/methods.js';

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
        KIA.state.assets.map
    );

    exportData.pages = KIA.state.pages.map;
    for(let [pk, pObj] of Object.entries(exportData.pages)) {
        exportData.pageInnerHtml[pk] = KIA.kiaCanvas.$id[`page${pk}`].innerHTML;
    }
    exportData.style = KIA.kiaCanvas.$id.style.textContent;

    exportData.layers = KIA.state.layers.map;

    const canvasState = KIA.state.canvas;
    exportData.canvas = {
        css: canvasState.css,
        pagesOrder: canvasState.pagesOrder,
        projectFonts: canvasState.projectFonts,
        createdAt: canvasState.createdAt,
        updatedAt: canvasState.updatedAt,
    };

    methods.exportProject(exportData);
}

export default Index;