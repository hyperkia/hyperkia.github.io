import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {    
    static handler(e) {
        if (e.detail.source.matches('.available-fonts')) this.updateRespectedFontWeight(e);        
    }

    static updateRespectedFontWeight(e){   
        const selectEl = e.detail.source;
        const itemEl = selectEl.closest('.missing-item');
        const selectedFont = selectEl.value;
        const weights = KIA.state.canvas.getProp('projectFonts')[selectedFont];
        const weightsEl = itemEl.querySelector('.font-weight-select');
        weightsEl.dataset.iweights = weights.i;
        weightsEl.dataset.nweights = weights.n;
    }
}

export default Index;