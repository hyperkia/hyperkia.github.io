

 
class Index {

    static handler(e){
        if (KIA.state.ui.getProp('activeTool') === 'zoom') KIA.actions.kiaCanvas.changeCanvasZoom(e);
    }

    
}

export default Index;