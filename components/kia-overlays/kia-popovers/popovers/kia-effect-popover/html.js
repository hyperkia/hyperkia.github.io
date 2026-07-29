const html = `
<section class="wrapper" part="wrapper">
    <header class="popover-header" part="popover-header">   
    <h5 class="popover-title" part="popover-title"></h5>    
    <kia-button class="close-popover-button" data-icon="x-solid-symbol" data-event="closePopover"></kia-button>
    </header>

    <ul class="effect-field-items">          
        <li class="effect-field-item">
            Offset X 
            <kia-input class="effect-field-item-input" data-type="number" data-id="offset-x" data-label-text="X"></kia-input>
        </li>
        <li class="effect-field-item">
            Offset Y 
            <kia-input class="effect-field-item-input" data-type="number" data-id="offset-y" data-label-text="Y"></kia-input>
        </li>
        <li class="effect-field-item">
            Blur Radius 
            <kia-input class="effect-field-item-input" data-type="number" data-id="blur-radius" data-label-icon="blur_on"></kia-input>
        </li>        
        <li class="effect-field-item spread-radius-item">
            Spread Radius 
            <kia-input class="effect-field-item-input effect-spread-radius" data-type="number" data-id="spread-radius" data-label-icon="target"></kia-input>
        </li>        
        <li class="effect-field-item">
            Color 
            <kia-input class="effect-field-item-input effect-field-color" data-id="color" data-label-icon="rectangle"></kia-input>
        </li>
        <li class="effect-field-item inset-item">
            Inset 
            <kia-select class="effect-field-item-input" value="false" data-id="inset" data-name="inset">
                <details part="details" class="select-wrapper">
                    <summary part="summary" class="select-trigger">No</summary>
                    <ul class="select-options" style="width:120px;">                        
                      <li class="select-option" value="true">Yes</li>
                      <li class="select-option selected" value="false">No</li>                      
                    </ul>
                </details>
            </kia-select>
        </li>
    </ul>
</section>
`;

export default html;