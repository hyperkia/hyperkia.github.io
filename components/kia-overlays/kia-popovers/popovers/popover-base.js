

const Index = {

	rootEl: null,
	dX: 0,
	dY: 0,
	mX: 0,
	mY: 0,

	event(e){
		if(e.type === 'pointerdown') {
			this.popoverEl = e.target;
			if(!this.popoverEl.matches('.popover')) return;
			this.eventDown(e);
		}
		if(e.type === 'pointermove') this.eventMove(e);
		if(e.type === 'pointerup') this.eventUp(e);
		if(e.type === 'pointercancel') this.eventUp(e);
	},

	eventDown(e){
		this.popoverEl.setPointerCapture(e.pointerId);
        this.dX = e.clientX;
        this.dY = e.clientY;
        this.elLeft = this.popoverEl.offsetLeft;
        this.elTop = this.popoverEl.offsetTop;
	},

	eventMove(e){
		if(!this.popoverEl) return;
		if (!this.popoverEl.hasPointerCapture(e.pointerId)) return;

        this.mX = e.clientX;
        this.mY = e.clientY;
        this.popoverEl.style.left = (this.elLeft+this.mX-this.dX)+'px';
        this.popoverEl.style.top = (this.elTop+this.mY-this.dY)+'px';        

        if((this.elLeft+this.mX-this.dX) < 10) this.popoverEl.style.left = '10px';
        if((this.elTop+this.mY-this.dY) < 10) this.popoverEl.style.top = '10px';
        if((this.elTop+this.mY-this.dY) > document.body.offsetHeight-100) this.popoverEl.style.top = document.body.offsetHeight-100+'px';
        if((this.elLeft+this.mX-this.dX) > document.body.offsetWidth-200) this.popoverEl.style.left = document.body.offsetWidth-200+'px';
	},

	eventUp(e){
		this.popoverEl.releasePointerCapture(e.pointerId)
	},
}

export default Index;