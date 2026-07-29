function Index(underScoreString){
		if(!underScoreString.includes('-')) return underScoreString;

		let word = '';
		underScoreString.split('-').forEach((w,i)=>{
			if(i===0) {
				word += w;
			} else {
				word += w.charAt(0).toUpperCase()+w.slice(1);
			}				
		})
		return word;
	}
	


export default Index;