import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

    static handler(e) {
        if (props.eRTAction === 'closeModal') props.root.close();
        if (props.eTAction === 'closeModal') props.root.close();
        if (props.eTAction === 'resolveFont') this.resolveFont();
    }

    static resolveFont(){        
        const data = {};
        const missingItems = props.root.$id.missingItems.children;
        [...missingItems].forEach((itemEl)=>{
            const missFont = itemEl.querySelector('.missing-font').innerText;
            const fontFamily = itemEl.querySelector('.available-fonts').value;
            let [fontWeight, fontStyle] = itemEl.querySelector('.font-weight-select').value.split('-');
            if(!fontStyle) fontStyle = 'normal';

            data[missFont] = {
                'font-family': fontFamily,
                'font-weight': fontWeight,
                'font-style': fontStyle,
            }
        });
        
        KIA.actions.kiaMissingFontsModal.resolveFont(data);
        props.root.close();
    }
}

export default Index;