import opentype from "./library/opentype.module.js";

function hyperkiaCompatible(fonts) {
    for(let f in fonts) {
        let weights = '';
        if(!fonts[f].weights) continue;
        if (fonts[f].weights.type === "variable") {
          const min = Math.floor(fonts[f].weights.min / 100);
          const max = Math.floor(fonts[f].weights.max / 100);

          const arr = [];
          for (let i = min; i <= max; i++) {
            arr.push(i);
          }

          weights = arr.join("");
        }

        if (fonts[f].weights.type === "static") {
          weights = Math.floor(fonts[f].weights.value / 100).toString();
        }

        fonts[f].varients = {i: '', n: weights.replace('10','')};
    }
}

async function Index(fonts) {

    const results = [];

    // for (const file of files) {
    for (const [key, fObj] of Object.entries(fonts)) {

        try {            
            if(!(fObj.data instanceof File)) continue;
            const buffer = await fObj.data.arrayBuffer();
            const fontData = opentype.parse(buffer);

            const family =
                fontData.names.fontFamily?.en ||
                fontData.names.fullName?.en ||
                "";

            let weights;

            // Detect variable font
            if (fontData.tables?.fvar) {

                const axis = fontData.tables.fvar.axes.find(a => a.tag === "wght");

                if (axis) {

                    weights = {
                        type: "variable",
                        min: axis.minValue,
                        max: axis.maxValue,
                        default: axis.defaultValue
                    };

                }

            }

            // Static font fallback
            if (!weights) {

                weights = {
                    type: "static",
                    value: fontData.tables?.os2?.usWeightClass || 400
                };

            }

            fObj.newName = family;
            fObj.weights = weights;

        } catch (error) {
            console.log('Font Parser Error', error);
            // results.push({
            //     fileName: file.name,
            //     error: "Invalid font file"
            // });

        }

    }

    return hyperkiaCompatible(fonts);
}

export default Index;