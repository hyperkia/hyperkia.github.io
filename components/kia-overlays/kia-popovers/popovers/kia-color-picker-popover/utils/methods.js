import props from './props.js';


const Methods = {

    // API
    uiStateColorPickerValueToUI() {
        const hexa = KIA.state.ui.colorPicker.value;        
        props.rgba = KIA.utils.color.hexaToRgbaObj(hexa);
        this.updateSVBoxBaseColor();
        this.updateSVBoxPointer();
        this.updateHueSliderPointer();
        this.updateRGBInputs();
        this.updateAlphaSliderColor();
        this.updateHexInput();
    },

    // SV Box
    updateSVBoxBaseColor: function() {
        const hsv = this.rgb2hsv(props.rgba);
        const rgb = this.hueToRGB(hsv.h);
        props.root.$id.cpickerSvbox.style.backgroundColor = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
        props.hsv = hsv;
    },

    updateSVBoxPointer: function() {
        const hsv = this.rgb2hsv(props.rgba);
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
        const rgb = this.hsv2rgb(hsv);
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


    // Hue Slider
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

    // Alpha Slider
    updateAlphaSliderColor: function() {
        const rgba = props.rgba;
        props.root.$id.cpickerAlphasliderBg.style.background = `linear-gradient(to right, rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, 0) 0%, rgb(${rgba.r}, ${rgba.g}, ${rgba.b}) 100%)`
    },

    // RGB Inputs
    updateRGBInputs: function() {
        props.root.$id.inputrgbR.value = props.rgba.r;
        props.root.$id.inputrgbG.value = props.rgba.g;
        props.root.$id.inputrgbB.value = props.rgba.b;
    },

    // Hex Input
    updateHexInput: function() {
        const hexValue = this.rgbToHex(props.rgba);
        props.root.$id.inputhex.value = hexValue;
    },

    // Utility Functions

    rgbaStringToHexa(str) {
        const rgba = this.KIA.utils.color.rgbaStrint2Object(str);
        const hexa = this.rgbToHex(rgba) + (rgba.a ? this.alphaNumberToHex(rgba.a * 100) : '');
        return hexa;
    },

    rgb2hsv: function(rgb) {
        // Step 1 - Normalize
        const normRGB = {
            r: rgb.r / 255,
            g: rgb.g / 255,
            b: rgb.b / 255,
        }

        // Step 2 - Min, Max, Delta
        const min = Math.min(...Object.values(normRGB));
        const max = Math.max(...Object.values(normRGB));
        const delta = (max - min);

        // Step 3 - V & S
        const v = Math.round(max * 100);
        const s = Math.round((max == 0 ? 0 : delta / max) * 100);

        // Step 4 - H
        let h = 0;
        if (max == normRGB.r) h = 60 * ((normRGB.g - normRGB.b) / delta);
        if (max == normRGB.g) h = 60 * ((normRGB.b - normRGB.r) / delta + 2);
        if (max == normRGB.b) h = 60 * ((normRGB.r - normRGB.g) / delta + 4);
        if (delta == 0) h = 0;
        if (h < 0) h += 360;
        h = Math.round(h)

        return { h, s, v };
    },

    hsv2rgb: function(h, s, v) {
        var r, g, b, i, f, p, q, t;
        if (arguments.length === 1) {
            s = h.s;
            v = h.v;
            h = h.h;
        }

        h = h / 360;
        s = s / 100;
        v = v / 100;

        i = Math.floor(h * 6);
        f = h * 6 - i;
        p = v * (1 - s);
        q = v * (1 - f * s);
        t = v * (1 - (1 - f) * s);

        switch (i % 6) {
            case 0:
                r = v;
                g = t;
                b = p;
                break;
            case 1:
                r = q;
                g = v;
                b = p;
                break;
            case 2:
                r = p;
                g = v;
                b = t;
                break;
            case 3:
                r = p;
                g = q;
                b = v;
                break;
            case 4:
                r = t;
                g = p;
                b = v;
                break;
            case 5:
                r = v;
                g = p;
                b = q;
                break;
        }

        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255)
        };
    },

    hueToRGB: function(H) {
        let S = 1;
        let V = 1;

        let h = H / 60;
        let i = Math.floor(h);
        let f = h - i;
        let p = V * (1 - S);
        let q = V * (1 - f * S);
        let t = V * (1 - (1 - f) * S);

        let r, g, b;
        switch (i % 6) {
            case 0:
                r = V;
                g = t;
                b = p;
                break;
            case 1:
                r = q;
                g = V;
                b = p;
                break;
            case 2:
                r = p;
                g = V;
                b = t;
                break;
            case 3:
                r = p;
                g = q;
                b = V;
                break;
            case 4:
                r = t;
                g = p;
                b = V;
                break;
            case 5:
                r = V;
                g = p;
                b = q;
                break;
        }

        // Convert 0-1 to 0-255
        r = Math.round(r * 255);
        g = Math.round(g * 255);
        b = Math.round(b * 255);

        return { r, g, b };
    },

    valueToHex: function(c) {
        let hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    },

    rgbToHex: function(rgb) {
        return "#" + this.valueToHex(rgb.r) + this.valueToHex(rgb.g) + this.valueToHex(rgb.b);
    },

    alphaNumberToHex(numb) {
        const val = Math.max(0, Math.min(100, numb));
        return Math.floor((val / 100) * 255).toString(16).padStart(2, '0');
    },


    // Others

    updateAdditionalData() {
        props.svBoxWidth = props.root.$id.cpickerSvbox.offsetWidth;
        props.svBoxHeight = props.root.$id.cpickerSvbox.offsetHeight;
    },

    eventDispatchedToTarget() {
        const hexValue = props.root.$id.inputhex.value + this.alphaNumberToHex(props.root.$id.inputalpha.value);
        KIA.actions.kiaColorPickerPopover.setColorValue(hexValue);
    },

}

export default Methods;