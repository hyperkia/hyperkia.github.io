import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Index {

    static handler(e) {        
        if(props.eTarget.dataset.id === 'search-icon') this.searchIcon();
    }

    static searchIcon(){        
        const value = props.root.$id.searchIcon.value.trim();
        props.root.style.setProperty('--search-icon-name', `"${value}"`);

        if(value.length < 2) {
            props.root.$id.iconItems.innerHTML = '';
            methods.loadSvgIcons();
            return;
        }
        
        const l = props.fontawesomeIcons.length;
        const icons = [];
        for(let i=0; i<l; i++) {            
            const icon = props.fontawesomeIcons[i];
            if(icon.toLowerCase().trim().includes(value.toLowerCase().trim())) {
                icons.push(icon);
            }
            if(icons.length === 50) break;            
        }

        const htmlIcons = methods.getIconsHtml(icons);
        props.root.$id.iconItems.innerHTML = htmlIcons;
    }

}

export default Index;