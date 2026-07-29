
import { zip, unzipSync, strFromU8 } from '../../library/browser.js';
import props from '../props.js';

async function Index(file){
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
}

export default Index;