
import { zip, unzipSync, strFromU8 } from '../library/browser.js';
import props from './props.js';

const Index = {
    base64ToUint8Array(base64) {
        const clean = base64.includes(',') ? base64.split(',')[1] : base64;
        const binary = atob(clean);
        const len = binary.length;

        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binary.charCodeAt(i);
        }

        return bytes;
    },

    uint8ToBase64(uint8) {
        let binary = '';
        const chunkSize = 0x8000; // prevent stack overflow

        for (let i = 0; i < uint8.length; i += chunkSize) {
            const sub = uint8.subarray(i, i + chunkSize);
            binary += String.fromCharCode(...sub);
        }

        return btoa(binary);
    },

    async importFromFile(file) {
        if (!file) throw new Error("No file provided");

        // 1. Read ZIP file
        const buffer = await file.arrayBuffer();

        // 2. Unzip
        const files = unzipSync(new Uint8Array(buffer));

        // 3. Get data.js
        const dataFile = files["data.js"];
        if (!dataFile) {
            throw new Error("Invalid Hyperkia ZIP: data.js missing");
        }

        // 4. Convert to string
        const dataStr = strFromU8(dataFile);

        // 5. Extract JSON safely
        let jsonStr = dataStr.trim();

        if (jsonStr.startsWith("window.__HYPERKIA_PROJECT__")) {
            jsonStr = jsonStr
                .replace(/^window\.__HYPERKIA_PROJECT__\s*=\s*/, '')
                .replace(/;$/, '');
        }

        let project;
        try {
            project = JSON.parse(jsonStr);
        } catch (e) {
            throw new Error("Invalid project JSON");
        }

        // 6. Restore assets
        const assets = project.assets || {};

        for (const key in assets) {
            const asset = assets[key];

            if (!asset || !asset.path) continue;

            const fileData = files[asset.path];
            if (!fileData) continue;

            try {
                const base64 = this.uint8ToBase64(fileData);

                const mime =
                    asset.type ||
                    (asset.ext ? `image/${asset.ext}` : 'application/octet-stream');

                asset.data = `data:${mime};base64,${base64}`;
            } catch (e) {
                console.warn("Asset restore failed:", asset.path);
            }
        }

        return project;
    },

    async exportProject(project) {
        const files = {};

        // 1. Deep clone
        const cleanProject = structuredClone(project);

        // 2. Process assets (OBJECT MAP SUPPORT ✅)
        const assetEntries = cleanProject.assets || {};

        for (const key in assetEntries) {
            const asset = assetEntries[key];
            if (!asset || !asset.data) continue;

            try {
                const uint8 = this.base64ToUint8Array(asset.data);

                // 🔹 detect extension
                let ext = asset.ext;
                if (!ext && asset.type) {
                    ext = asset.type.split('/')[1];
                }
                if (!ext) ext = 'bin';

                // 🔹 use original name (already has .svg etc.)
                const fileName = asset.name || `${key}.${ext}`;
                const path = `assets/${fileName}`;

                // ✅ store real file
                files[path] = uint8;

                // ❌ remove base64
                delete asset.data;

                // ✅ add path reference
                asset.path = path;

            } catch (e) {
                console.error('Asset processing failed:', asset, e);
            }
        }

        // 3. Add data.json
        files["data.js"] = new TextEncoder().encode(
            `window.__HYPERKIA_PROJECT__ = ${JSON.stringify(cleanProject)};`
        );

        // 4. Add index.html
        files["index.html"] = new TextEncoder().encode(
            props.template
        );

        // 5. Create ZIP
        zip(files, { level: 6 }, (err, zipped) => {
            if (err) {
                console.error('ZIP error:', err);
                return;
            }

            const blob = new Blob([zipped], { type: 'application/zip' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = 'hyperkia-project.zip';
            a.click();

            URL.revokeObjectURL(url);
        });
    },

    normalizeAssets(data){
        const assetsKeyMap = {};
        for(let [aOldKey, aObj] of Object.entries(data.assets)) {
            const uint8 = this.base64ToUint8Array(aObj.data);
            aObj.blob =  new File([uint8], aObj.name, { type: aObj.type });
            const newKey = crypto.randomUUID();
            aObj.key = newKey;
            assetsKeyMap[newKey] = aOldKey;
            delete aObj.data;
            delete aObj.path;
        };

        data.assetsKeyMap = assetsKeyMap;
    },

    normalizePages(data){
        const pages = {};
        const pagesKeyMap = {};

        for( let [pOldKey, pObj] of Object.entries(data.pages) ) {
            const newKey = crypto.randomUUID();
            pObj.key = newKey;
            pages[newKey] = pObj;
            pagesKeyMap[pOldKey] = newKey;
        }

        data.pages = pages;
        data.pagesKeyMap = pagesKeyMap;
    },

    normalizeLayers(data){
        const layers = {};
        const aMap = data.assetsKeyMap;

        for( let [lOldKey, lObj] of Object.entries(data.layers) ) {

            // Layers
            const newKey = crypto.randomUUID();
            lObj.key = newKey;
            lObj.oldKey = lOldKey;
            lObj.pId = data.pagesKeyMap[lObj.pId];
            layers[newKey] = lObj;

            // layers Order
            const pageLayers = data.pages[lObj.pId].layers;
            const layerIndex = pageLayers.indexOf(lOldKey);
            if(layerIndex !== -1) pageLayers[layerIndex] = newKey;

            // Asset
            if(lObj.attrs?.src && aMap[lObj.attrs.src]) lObj.attrs.src = aMap[lObj.attrs.src];
        }
        data.layers = layers;
    },

    normalizeCanvas(data){
        const pagesOrder = data.canvas.pagesOrder;
        pagesOrder.forEach((oldKey, i)=>{
            pagesOrder[i] = data.pagesKeyMap[oldKey];
        })
    },
}

export default Index;