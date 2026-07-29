
import props from './props.js';

const Index = {

	renderDevUi(){
		const selectionId = KIA.state.ui.getSelectionId();
		if(!selectionId) return;
		const selectionEl = KIA.canvasRefMap[selectionId] || KIA.kiaCanvas;
		const selectionStyle = KIA.nodesMap[selectionId]?.style || KIA.state.canvas.getProp('style');
		if(!selectionEl) return;
		const style = window.getComputedStyle(selectionEl);
		this.cleanNewRuleNodes(selectionStyle);
		this.renderBoxModal(style);
		this.renderDevRules(style);
		this.renderAdvanceDevRules(selectionStyle);
	},

	renderBoxModal(style){
		props.root.$id.boxmodalContent.textContent = `${style.width} X ${style.height}`.replaceAll('px','');
		props.root.$id.borderwidthTop.value = parseInt(style['border-top-width']);
		props.root.$id.borderwidthRight.value = parseInt(style['border-right-width']);
		props.root.$id.borderwidthBottom.value = parseInt(style['border-bottom-width']);
		props.root.$id.borderwidthLeft.value = parseInt(style['border-left-width']);
	},

	renderDevRules(style){
		props.root._qsAll('.style-rule').forEach(sr=>sr.classList.add('hidden'));
		props.uiRules.forEach((ur)=>{
			const styleRuleEl = props.root._qs(`[data-rule="${ur}"]`);			
			if(!styleRuleEl) return;
			const valueEl = styleRuleEl.querySelector('.rule-value');			
			styleRuleEl.classList.remove('hidden');
			let value = style[ur];
			if(props.colorUiRules.includes(ur)) value = KIA.utils.color.normalizeColorToHex(value);
			valueEl.textContent = value;
		});
	},

	renderAdvanceDevRules(style){
		const advanceUiRules = [];
		for(let [p,v] of Object.entries(style)) {
			if(props.skipUiRules.includes(p)) continue;
			if(props.uiRules.includes(p)) continue;
			advanceUiRules.push(p);
		}
		const parentEl = props.root.$id.AdvancedRules;
		[...parentEl.children].forEach((cEl)=>{			
			cEl.classList.add('hidden');
		});

		const extraRulesNode = advanceUiRules.length - parentEl.childElementCount;
		for(let i=1; i<=extraRulesNode; i++) {
			const ruleTemplate = props.root.$id.styleRuleTemplate.content.cloneNode(true);
			parentEl.appendChild(ruleTemplate);
		}
		

		advanceUiRules.forEach((ar,i)=>{			
			const styleRuleEl = parentEl.children[i];
			const rulePropEl = styleRuleEl.querySelector('.rule-prop');
			const ruleValueEl = styleRuleEl.querySelector('.rule-value');
			rulePropEl.textContent = `${ar}`
			ruleValueEl.textContent = style[ar];
			styleRuleEl.classList.remove('hidden');
		});
	},

	createNewRule(styleRulesEl){
		const newRuleEls = styleRulesEl.querySelectorAll('.new-rule');		
		const isAnyFreeStyleRuleEl = [...newRuleEls].find( cEl => cEl.offsetWidth === 0 );		
		let styleRuleEl = null;
		if(!isAnyFreeStyleRuleEl) {
			const ruleTemplate = props.root.$id.styleRuleTemplate.content.cloneNode(true);
			styleRuleEl = ruleTemplate.querySelector('.style-rule');
			styleRulesEl.appendChild(ruleTemplate);
		} else {
			styleRuleEl = isAnyFreeStyleRuleEl;
			styleRulesEl.appendChild(styleRuleEl);
		}

		const rulePropEl = styleRuleEl.querySelector('.rule-prop');
		const ruleValueEl = styleRuleEl.querySelector('.rule-value');
		rulePropEl.setAttribute('contenteditable', true);
		ruleValueEl.setAttribute('contenteditable', true);
		styleRuleEl.classList.remove('hidden');
		rulePropEl.focus();
	},

	collectStyleRules(styleRulesEl){
		const style = {};
		[...styleRulesEl.children].forEach((cEl)=>{
			const ruleProp = cEl.querySelector('.rule-prop').textContent.trim();
			const ruleValue = cEl.querySelector('.rule-value').textContent.trim();
			if(ruleValue && ruleValue) style[ruleProp] = ruleValue;			
		});
		return style;
	},

	cleanNewRuleNodes(){
		props.root._qsAll('.new-rule').forEach( nrNode => nrNode.remove())
	},

	pasteStyle(cssText, styleRulesEl){
		const parseCss = KIA.utils.css.parseCss(cssText);
		KIA.managers.style.styleCodeToSelection(parseCss);

		for(const [p,v] of Object.entries(parseCss)) {
			const ruleTemplate = props.root.$id.styleRuleTemplate.content.cloneNode(true);

			const rulePropEl = ruleTemplate.querySelector('.rule-prop');
			const ruleValueEl = ruleTemplate.querySelector('.rule-value');

			rulePropEl.textContent = p;
			ruleValueEl.textContent = v;

			styleRulesEl.appendChild(ruleTemplate);
		}		
	},

	setSelectionTypeUi(){		
		const selectionType = KIA.dom.read.getSelectionDesignUiType();
		props.root.$id.devmode.dataset.selectionType = selectionType;
	},
};

export default Index;