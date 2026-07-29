
import props from '../utils/props.js';

 
const Index = {
	loadSvgIcons(){
		
		// props.fontawesomeIcons = KIA.data.icons.getIcons('fontawesome');
		
		// const startIndex = props.root.$id.iconItems.children.length;
		// const endIndex = startIndex+100;
		// const names = Object.keys(props.fontawesomeIcons);

		// let html = '';
		// for(let i=startIndex; i<=endIndex; i++) {			
		// 	html += `
		// 		<div class="icon-item" data-fontawesome-icon-name="${names[i]}">
		// 			<svg><use href="data/icons/fontawesome/sprite.svg#${names[i]}"></use></svg>
		// 		</div>
		// 	`;
		// }
		// props.root.$id.iconItems.insertAdjacentHTML('beforeend', html);


		if(!props.fontawesomeIcons) props.fontawesomeIcons = KIA.data.icons.getIconsName('fontawesome');
        const startIndex = props.root.$id.iconItems.children.length;
        const endIndex = startIndex + 99;
        
        const icons = [];        
        for (let i = startIndex; i <= endIndex; i++) {                   
            icons.push(props.fontawesomeIcons[i]);
        }
        const htmlIcons = this.getIconsHtml(icons);        
        props.root.$id.iconItems.insertAdjacentHTML('beforeend', htmlIcons);        
    },

    getIconsHtml(icons){
        const html = [];
        icons.forEach((i)=>{
            html.push(`               
				<div class="icon-item" data-fontawesome-icon-name="${i}">
					<svg><use href="data/icons/fontawesome/sprite.svg#${i}"></use></svg>
				</div>
			`);
        
        });
        return html.join('');        
    },

    scrollEndFetchMoreIcons: function(){
		const lastChild = props.root.$id.iconItems.lastElementChild;
        if (!lastChild) return;
        const lastChildRect = KIA.utils.dom.getRect(lastChild);
        if (document.body.offsetHeight > lastChildRect.top) this.loadSvgIcons();
    }
};

export default Index;