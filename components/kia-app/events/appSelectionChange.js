
class Index {

	static components = [];

	static handler(e){
		const detail = e.detail;
		for(let [cName, cEl] of Object.entries(KIA)) {			
			if(detail.host === cEl) continue;
			if(cEl.isConnected && cEl.tagName) KIA[cName]?.appSelectionChange?.(e);
		}
	}

}

export default Index;