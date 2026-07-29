function Index() {
    let zoom = 1;
    let pagesX = 0;
    let pagesY = 0;
 
    for (let i = 0; i < 50; i++) {
        const pagesWidth = parseInt((zoom * KIA.kiaCanvas.$id.pages.offsetWidth) / 1);

        if (KIA.kiaCanvas.offsetWidth < pagesWidth + 100) {
            zoom = +(zoom /= 1.2);
            pagesX = parseInt((KIA.kiaCanvas.offsetWidth - pagesWidth + 135) / 2);
            pagesY = 70;            
        }
    }

    KIA.state.ui.setCanvasScale({zoom, pagesX, pagesY});
}

export default Index;