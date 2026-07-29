const html = `
<section class="wrapper" part="wrapper">
    <header class="popover-header" part="popover-header">   
    <h5 part="popover-title">Color Picker</h5>    
    <kia-button class="close-popover-button" data-icon="x-solid-symbol" data-event="closePopover"></kia-button>
    </header>
    <div part="clrstyle" class="clrstyle hidden">
        <span class="clrstyle-item clrstyle-solid" data-clrstyle="solid" data-event-id="clrstyle"></span>
        <span class="clrstyle-item clrstyle-gradient" data-clrstyle="gradient" data-event-id="clrstyle"></span>
    </div>
      
    <div data-id="cpicker" class="cpicker">
        <div class="cpicker-svbox" data-id="cpicker-svbox">
            <span data-id="cpicker-svbox-pointer" class="cpicker-svbox-pointer"></span>
        </div>

        <div class="cpicker-contrloswrap">
            <div class="cpicker-hueslider">
                <input data-id="inputslider-hue" type="range" min="0" max="360" step="1">
            </div>
            <div class="cpicker-alphaslider">
                <div data-id="cpicker-alphaslider-bg" class="cpicker-alphaslider-bg">
                    <input data-id="inputslider-alpha" type="range" value="100" min="0" max="100" step="1">
                </div>
            </div>
            <div class="cpicker-form">           
                <kia-select class="cpicker-codeswitch" data-id="cpicker-codeswitch" data-name="cpicker-codeswitch">
                    <details part="details" class="select-wrapper">
                        <summary data-id="switchtag-summary" part="summary" class="select-trigger">RGBA</summary>
                        <ul class="select-options scroll-design" style="width: 80px;top: -50%;transform: none;">
                            <li part="section-tag" class="select-option selected" value="rgb">RGBA</li>
                            <li part="section-tag" class="select-option" value="hex">HEXA</li>
                        </ul>
                    </details>
                </kia-select>
                <div data-id="cpicker-inputs-wrapper" class="cpicker-inputs-wrapper">
                    <div class="cpicker-inputs cpicker-inputs-rgb show">
                        <input data-id="inputrgb-r" type="number" class="cpicker-input input-rgb" value="198" step="1" min="0" max="255">
                        <input data-id="inputrgb-g" type="number" class="cpicker-input input-rgb" value="14" step="1" min="0" max="255">
                        <input data-id="inputrgb-b" type="number" class="cpicker-input input-rgb" value="14" step="1" min="0" max="255">
                    </div>
                    <div class="cpicker-inputs cpicker-inputs-hex">
                        <input data-id="inputhex" type="text" class="cpicker-input inputhex">
                    </div>
                    <div class="cpicker-inputs cpicker-input-alpha show" data-id="cpicker-input-alpha">
                        <input data-id="inputalpha" type="number" class="cpicker-input" value="100" step="1" min="0" max="100">
                    </div>
                </div>
            </div>
        </div>        
    </div>
</section>
`;

export default html;