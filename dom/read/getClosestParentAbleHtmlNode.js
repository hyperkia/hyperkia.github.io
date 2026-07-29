function Index(parentEl){	
    while(parentEl) {
    	if(
            parentEl instanceof HTMLElement && 
            KIA.registry.tags.canHaveChildren(parentEl.tagName)
        ) return parentEl;
    	parentEl = parentEl.parentElement;
    }
}

export default Index;