import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Input {
    static handler(e) {
        if (props.eTarget.closest('[data-id="inputslider-hue"]')) this.hueSliderInput();
        if (props.eTarget.closest('[data-id="inputslider-alpha"]')) this.alphaSliderInput();
        if (props.eTarget.closest('[data-id="inputalpha"]')) this.alphaInput();
        if (props.eTarget.matches('.input-rgb')) this.inputRgb();
        if (props.eTarget.matches('[data-id="inputhex"]')) this.inputHexa();
    }
 
    static hueSliderInput(e) {
        const percent = (props.root.$id.inputsliderHue.value / 360) * 100;
        const rgb = methods.getHueGradientColorAt(percent);
        Object.assign(props.rgba, rgb);
        methods.updateSVBoxBaseColor();
        methods.updateRGBInputs();
        methods.updateAlphaSliderColor();
        methods.updateHexInput();
        methods.eventDispatchedToTarget();
    }

    static alphaSliderInput(e) {
        const value = props.root.$id.inputsliderAlpha.value;        
        props.root.$id.inputalpha.value = value;
        props.rgba.a = value / 100;
        methods.updateRGBInputs();
        methods.updateHexInput();
        methods.eventDispatchedToTarget();
    }

    static alphaInput(){
        const value = props.root.$id.inputalpha.value;        
        props.root.$id.inputsliderAlpha.value = value;
        props.rgba.a = value / 100;
        methods.eventDispatchedToTarget();
    }

    static inputRgb(){
        props.rgba.r = +props.root.$id.inputrgbR.value.trim(); 
        props.rgba.g = +props.root.$id.inputrgbG.value.trim(); 
        props.rgba.b = +props.root.$id.inputrgbB.value.trim();
        methods.updateSVBoxBaseColor();
        methods.updateHueSliderPointer();
        methods.updateSVBoxPointer();
        methods.updateAlphaSliderColor();
        methods.eventDispatchedToTarget();
    }

    static inputHexa(){
        const inputEl = props.root.$id.inputhex;
        let value = inputEl.value.trim();
        const rgba = KIA.utils.color.hexaToRgbaObj(value);
        
        if ( !Number.isFinite(rgba.r) || !Number.isFinite(rgba.g) ||
            !Number.isFinite(rgba.b) || !Number.isFinite(rgba.a)
        )  return;

        props.root.$id.inputsliderAlpha.value = parseInt(rgba.a*100);
        props.root.$id.inputalpha.value = parseInt(rgba.a*100);

        props.rgba.r = rgba.r; 
        props.rgba.g = rgba.g; 
        props.rgba.b = rgba.b;
        props.rgba.a = rgba.a;

        methods.updateSVBoxBaseColor();
        methods.updateHueSliderPointer();
        methods.updateSVBoxPointer();
        methods.updateAlphaSliderColor();
        methods.eventDispatchedToTarget();
    }
}

export default Input;