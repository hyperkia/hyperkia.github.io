import props from './props.js';


const Methods = {

    uiStateColorPickerValueToUI() {
        const hexa = KIA.state.ui.getProp('colorPicker').value;
        if(!hexa) return;
        props.rgba = KIA.utils.color.hexaToRgbaObj(hexa);

        this.updateSVBoxBaseColor();
        this.updateSVBoxPointer();
        this.updateHueSliderPointer();
        this.updateRGBInputs();
        this.updateAlphaSliderColor();
        this.updateAlphaInput();
        this.updateAlphaSliderInput();
        this.updateHexInput();
    },

    updateSVBoxBaseColor: function() {
        const hsv = KIA.utils.color.rgb2hsv(props.rgba);
        const rgb = KIA.utils.color.hueToRGB(hsv.h);
        props.root.$id.cpickerSvbox.style.backgroundColor = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
        props.hsv = hsv;
    },

    updateSVBoxPointer: function() {
        const hsv = KIA.utils.color.rgb2hsv(props.rgba);
        const xy = this.hsvToSVCoordinates(hsv);
        props.root.$id.cpickerSvboxPointer.style.left = xy.x - 6 + 'px';
        props.root.$id.cpickerSvboxPointer.style.top = xy.y - 4 + 'px';
    },

    updateSVBoxPointerUIByPointerEvent: function(e) {

        const svBoxRect = KIA.utils.dom.getRect(props.root.$id.cpickerSvbox);
        let x = e.clientX - svBoxRect.left;
        let y = e.clientY - svBoxRect.top;

        const rgb = this.getRGBThroughSVBoxXY(x, y);
        Object.assign(props.rgba, rgb);
        const rgbCSS = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b}, ${props.rgba.a})`;

        x -= 6;
        y -= 6;
        if (x > props.svBoxWidth - 6) x = props.svBoxWidth - 6;
        if (y > props.svBoxHeight - 6) y = props.svBoxHeight - 6;
        if (x < 0) x = -6;
        if (y < 0) y = -6;

        props.root.$id.cpickerSvboxPointer.style.left = x + 'px';
        props.root.$id.cpickerSvboxPointer.style.top = y + 'px';

        this.updateAlphaSliderColor();
        this.updateRGBInputs();
        this.updateHexInput();
        this.eventDispatchedToTarget();
    },

    getRGBThroughSVBoxXY: function(x, y) {
        const hsv = this.getHSVFromSVBoxThroughXY(x, y);
        const rgb = KIA.utils.color.hsv2rgb(hsv);
        return rgb;
    },

    getHSVFromSVBoxThroughXY: function(x, y) {
        const h = props.hsv.h;
        x = Math.max(0, Math.min(props.svBoxWidth, x));
        y = Math.max(0, Math.min(props.svBoxHeight, y));

        const s = (x / props.svBoxWidth) * 100;
        const v = (1 - y / props.svBoxHeight) * 100;

        return { h, s, v };
    },

    hsvToSVCoordinates: function(hsv) {
        const x = (hsv.s / 100) * props.svBoxWidth;
        const y = (1 - hsv.v / 100) * props.svBoxHeight;
        return { x, y };
    },

    updateHueSliderPointer() {
        const { r, g, b } = props.rgba;
        // Normalize RGB to [0,1]
        const r1 = r / 255,
            g1 = g / 255,
            b1 = b / 255;
        const max = Math.max(r1, g1, b1);
        const min = Math.min(r1, g1, b1);
        const delta = max - min;

        let hue = 0;
        if (delta !== 0) {
            if (max === r1) {
                hue = ((g1 - b1) / delta) % 6;
            } else if (max === g1) {
                hue = (b1 - r1) / delta + 2;
            } else {
                hue = (r1 - g1) / delta + 4;
            }
            hue *= 60;
            if (hue < 0) hue += 360;
        }

        props.root.$id.inputsliderHue.value = hue;
    },

    getHueGradientColorAt: function(percent) {
        let rgb = null;
        const stops = [
            { pct: 0, color: [255, 0, 0] }, // red
            { pct: 16.66, color: [255, 255, 0] }, // yellow
            { pct: 33.33, color: [0, 255, 0] }, // green
            { pct: 50.00, color: [0, 255, 255] }, // cyan
            { pct: 66.66, color: [0, 0, 255] }, // blue
            { pct: 83.33, color: [255, 0, 255] }, // magenta
            { pct: 100.0, color: [255, 0, 0] } // red again
        ];

        // Clamp percentage
        percent = Math.max(0, Math.min(100, percent));

        // Find the two surrounding stops
        for (let i = 0; i < stops.length - 1; i++) {
            const stop1 = stops[i];
            const stop2 = stops[i + 1];

            if (percent >= stop1.pct && percent <= stop2.pct) {
                const range = stop2.pct - stop1.pct;
                const ratio = (percent - stop1.pct) / range;

                const r = Math.round(stop1.color[0] + (stop2.color[0] - stop1.color[0]) * ratio);
                const g = Math.round(stop1.color[1] + (stop2.color[1] - stop1.color[1]) * ratio);
                const b = Math.round(stop1.color[2] + (stop2.color[2] - stop1.color[2]) * ratio);

                rgb = { r, g, b };
            }
        }

        // Fallback
        return rgb;
    },

    updateAlphaSliderColor: function() {
        const rgba = props.rgba;
        props.root.$id.cpickerAlphasliderBg.style.background = `linear-gradient(to right, rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, 0) 0%, rgb(${rgba.r}, ${rgba.g}, ${rgba.b}) 100%)`
    },

    updateAlphaSliderInput(){
        props.root.$id.inputsliderAlpha.value = Math.round(props.rgba.a*100);
    },

    updateAlphaInput(){
        props.root.$id.inputalpha.value = Math.round(props.rgba.a*100);
    },

    updateRGBInputs: function() {
        props.root.$id.inputrgbR.value = props.rgba.r;
        props.root.$id.inputrgbG.value = props.rgba.g;
        props.root.$id.inputrgbB.value = props.rgba.b;
    },

    updateHexInput: function() {
        const hexValue = KIA.utils.color.rgbToHex(props.rgba);
        props.root.$id.inputhex.value = hexValue;
    },

    eventDispatchedToTarget() {
        let hexValue = props.root.$id.inputhex.value;
        const alphaHex = KIA.utils.color.alpha100NumberToHex(props.root.$id.inputalpha.value).trim();
        if(hexValue.indexOf('#') !== 0) hexValue = '#'+hexValue;        
        if(hexValue.length < 8 && alphaHex !== 'ff') hexValue = hexValue+alphaHex;
        KIA.actions.kiaColorPickerPopover.setColorValue(hexValue);
    },

}

export default Methods;