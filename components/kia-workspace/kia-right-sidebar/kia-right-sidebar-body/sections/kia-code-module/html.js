const html = `
	<div class="devmode" data-id="devmode" data-selection-type="canvas">

		<div class="boxmodal">
			<div class="boxmodal-margin">
				<div class="boxmodal-padding">
					<input class="boxmodal-borderwidth borderwidth-top" data-prop="border-top-width" data-unit="px" data-id="borderwidth-top" type="number" value="0" min="0" max="100" step="1">
					<input class="boxmodal-borderwidth borderwidth-right" data-prop="border-right-width" data-unit="px" data-id="borderwidth-right" type="number" value="0" min="0" max="100" step="1">
					<input class="boxmodal-borderwidth borderwidth-bottom" data-prop="border-bottom-width" data-unit="px" data-id="borderwidth-bottom" type="number" value="0" min="0" max="100" step="1">
					<input class="boxmodal-borderwidth borderwidth-left" data-prop="border-left-width" data-unit="px" data-id="borderwidth-left" type="number" value="0" min="0" max="100" step="1">
					<div class="boxmodal-content" data-id="boxmodalContent">1366 X 741</div>
				</div>
			</div>
		</div>

		<div class="design-modules">
			
			<div class="design-module typography-design-module">
				<div class="design-module-header">
					<h5 class="design-module-header-title">Typography</h5>
					<kia-button class="iconbtn copy-style-rules" title="Copy" data-class="tab-link" data-icon="copy-symbol"></kia-button>
				</div>
				<div class="design-module-body">
					<ul class="style-rules" data-id="typographyRules">
						<li class="style-rule font-size-style-rule" data-rule="font-size">
							<span class="rule-prop">font-size</span>
							<span class="rule-colon">:</span>
							<span class="rule-value"></span>
							<span class="rule-end">;</span>
						</li>
						<li class="style-rule line-height-style-rule" data-rule="line-height">
							<span class="rule-prop">line-height</span>
							<span class="rule-colon">:</span>
							<span class="rule-value"></span>
							<span class="rule-end">;</span>
						</li>
						<li class="style-rule font-weight-style-rule" data-rule="font-weight">
							<span class="rule-prop">font-weight</span>
							<span class="rule-colon">:</span>
							<span class="rule-value"></span>
							<span class="rule-end">;</span>
						</li>
						<li class="style-rule letter-spacing-style-rule" data-rule="letter-spacing">
							<span class="rule-prop">letter-spacing</span>
							<span class="rule-colon">:</span>
							<span class="rule-value"></span>
							<span class="rule-end">;</span>
						</li>
						<li class="style-rule font-family-style-rule" data-rule="font-family">
							<span class="rule-prop">font-family</span>
							<span class="rule-colon">:</span>
							<span class="rule-value"></span>
							<span class="rule-end">;</span>
						</li>	
						<li class="style-rule color-style-rule" data-rule="color">
							<span class="rule-prop">color</span>
							<span class="rule-colon">:</span>
							<span class="rule-value"></span>
							<span class="rule-end">;</span>
						</li>						
					</ul>	
				</div>
			</div>

			<div class="design-module fill-design-module">
				<div class="design-module-header">
					<h5 class="design-module-header-title">Fill</h5>
					<kia-button class="iconbtn copy-style-rules" title="Copy" data-class="tab-link" data-icon="copy-symbol"></kia-button>
				</div>
				<div class="design-module-body">
					<ul class="style-rules" data-id="fillRules">
						<li class="style-rule background-color-style-rule" data-rule="background-color">
							<span class="rule-prop">background-color</span>
							<span class="rule-colon">:</span>
							<span class="rule-value"></span>
							<span class="rule-end">;</span>
						</li>
						<li class="style-rule background-image-style-rule" data-rule="background-image">
							<span class="rule-prop">background-image</span>
							<span class="rule-colon">:</span>
							<span class="rule-value"></span>
							<span class="rule-end">;</span>
						</li>
						<li class="style-rule fill-style-rule" data-rule="fill">
							<span class="rule-prop">fill</span>
							<span class="rule-colon">:</span>
							<span class="rule-value"></span>
							<span class="rule-end">;</span>
						</li>
						<li class="style-rule opacity-style-rule" data-rule="opacity">
							<span class="rule-prop">opacity</span>
							<span class="rule-colon">:</span>
							<span class="rule-value"></span>
							<span class="rule-end">;</span>
						</li>						
					</ul>	
				</div>
			</div>

			<div class="design-module layout-design-module">
				<div class="design-module-header">
					<h5 class="design-module-header-title">Layout</h5>
					<kia-button class="iconbtn copy-style-rules" title="Copy" data-class="tab-link" data-icon="copy-symbol"></kia-button>
				</div>
				<div class="design-module-body">
					<ul class="style-rules" data-id="layoutRules">
						<li class="style-rule left-style-rule" data-rule="left">
							<span class="rule-prop">left</span>
							<span class="rule-colon">:</span>
							<span class="rule-value">20px</span>
							<span class="rule-end">;</span>
						</li>
						<li class="style-rule top-style-rule" data-rule="top">
							<span class="rule-prop">top</span>
							<span class="rule-colon">:</span>
							<span class="rule-value">20px</span>
							<span class="rule-end">;</span>
						</li>
						<li class="style-rule width-style-rule" data-rule="width">
							<span class="rule-prop">width</span>
							<span class="rule-colon">:</span>
							<span class="rule-value">20px</span>
							<span class="rule-end">;</span>
						</li>
						<li class="style-rule height-style-rule" data-rule="height">
							<span class="rule-prop">height</span>
							<span class="rule-colon">:</span>
							<span class="rule-value">20px</span>
							<span class="rule-end">;</span>
						</li>
					</ul>	
				</div>
			</div>							

			<div class="design-module stroke-design-module">
				<div class="design-module-header">
					<h5 class="design-module-header-title">Stroke</h5>
					<kia-button class="iconbtn copy-style-rules" title="Copy" data-class="tab-link" data-icon="copy-symbol"></kia-button>
				</div>
				<div class="design-module-body">
					<ul class="style-rules" data-id="strokeRules">
						<li class="style-rule border-width-style-rule" data-rule="border-width">
							<span class="rule-prop">border-width</span>
							<span class="rule-colon">:</span>
							<span class="rule-value"></span>
							<span class="rule-end">;</span>
						</li>
						<li class="style-rule border-style-style-rule" data-rule="border-style">
							<span class="rule-prop">border-style</span>
							<span class="rule-colon">:</span>
							<span class="rule-value"></span>
							<span class="rule-end">;</span>
						</li>
						<li class="style-rule border-color-style-rule" data-rule="border-color">
							<span class="rule-prop">border-color</span>
							<span class="rule-colon">:</span>
							<span class="rule-value"></span>
							<span class="rule-end">;</span>
						</li>
						<li class="style-rule stroke-style-rule" data-rule="stroke">
							<span class="rule-prop">stroke</span>
							<span class="rule-colon">:</span>
							<span class="rule-value"></span>
							<span class="rule-end">;</span>
						</li>
						<li class="style-rule stroke-width-style-rule" data-rule="stroke-width">
							<span class="rule-prop">stroke-width</span>
							<span class="rule-colon">:</span>
							<span class="rule-value"></span>
							<span class="rule-end">;</span>
						</li>
					</ul>	
				</div>
			</div>

			<div class="design-module effect-design-module">
				<div class="design-module-header">
					<h5 class="design-module-header-title">Effect</h5>
					<kia-button class="iconbtn copy-style-rules" title="Copy" data-class="tab-link" data-icon="copy-symbol"></kia-button>
				</div>
				<div class="design-module-body">
					<ul class="style-rules" data-id="effectRules">
						<li class="style-rule box-shadow-style-rule" data-rule="box-shadow">
							<span class="rule-prop">box-shadow</span>
							<span class="rule-colon">:</span>
							<span class="rule-value"></span>
							<span class="rule-end">;</span>
						</li>
						<li class="style-rule text-shadow-style-rule" data-rule="text-shadow">
							<span class="rule-prop">text-shadow</span>
							<span class="rule-colon">:</span>
							<span class="rule-value"></span>
							<span class="rule-end">;</span>
						</li>
						<li class="style-rule filter-style-rule" data-rule="filter">
							<span class="rule-prop">filter</span>
							<span class="rule-colon">:</span>
							<span class="rule-value"></span>
							<span class="rule-end">;</span>
						</li>						
					</ul>	
				</div>
			</div>

			<div class="design-module advance-design-module">
				<div class="design-module-header">
					<h5 class="design-module-header-title">Advanced</h5>
					<kia-button class="iconbtn" title="Add" data-class="tab-link" data-event="addNewRule" data-icon="plus-solid-symbol"></kia-button>
					<kia-button class="iconbtn copy-style-rules" title="Copy" data-class="tab-link" data-icon="copy-symbol"></kia-button>
				</div>
				<div class="design-module-body">
					<ul class="style-rules" data-id="AdvancedRules"></ul>	
				</div>
			</div>
	
			
			<template data-id="styleRuleTemplate">
				<li class="style-rule new-rule" data-rule="">
					<span class="rule-prop"></span>
					<span class="rule-colon">:</span>
					<span class="rule-value"></span>
					<span class="rule-end">;</span>
				</li>
			</template>	
		</div>
	</div>
`;

export default html;