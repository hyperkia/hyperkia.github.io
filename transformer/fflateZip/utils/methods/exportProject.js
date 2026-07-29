
import { zip, unzipSync, strFromU8 } from '../../library/browser.js';
import props from '../props.js';

async function Index(project){
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
            const fileName = `${asset.name}.${ext}` || `${key}.${ext}`;
            let path = `assets/${fileName}`;
            let counter = 1;

            while (files[path]) {
                const dot = fileName.lastIndexOf('.');
                const name = dot >= 0 ? fileName.slice(0, dot) : fileName;
                const extension = dot >= 0 ? fileName.slice(dot) : '';
                path = `assets/${name}_${counter++}${extension}`;
            }

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
}

export default Index;