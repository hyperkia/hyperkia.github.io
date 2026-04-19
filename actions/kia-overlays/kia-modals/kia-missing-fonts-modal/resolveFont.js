function Index(resolveFonts) {
    
    // const psdLayers = [];
    // const layersNewObj = {};
    // const layers = KIA.state.layers.getProp('map');
    // const pages = KIA.state.pages.map;
    // for(let [pKey, pObj] of Object.entries(pages)) {
    //     if(pObj.source === 'psd') psdLayers.push(...pObj.layers);
    // }

    // psdLayers.forEach((lKey)=>{
    //     const lObj = layers[lKey];
    //     if(!lObj) return;

    //     // Layer InnerText
    //     if (lObj.innerText) {
    //       const parser = new DOMParser();
    //       const doc = parser.parseFromString(lObj.innerText, "text/html");

    //       const els = doc.querySelectorAll("*");

    //       els.forEach((el) => {
    //         const elFont = el.style.fontFamily;

    //         if (elFont && resolveFonts[elFont]) {
    //           Object.assign(el.style, resolveFonts[elFont]);
    //         }
    //       });

    //       lObj.innerText = doc.body.innerHTML;
    //     }

    //     // Layer
    //     const layerFont = lObj.css['font-family'];
    //     if(layerFont && resolveFonts[layerFont]) {
    //         layersNewObj[lKey] = {
    //             key: lKey,
    //             css: resolveFonts[layerFont]
    //         }
    //     }
        
    // });

    // KIA.state.layers.updatePsdLayers(layersNewObj);
}

export default Index;
