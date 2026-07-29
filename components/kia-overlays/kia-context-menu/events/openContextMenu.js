
import props from '../utils/props.js';
import methods from '../utils/methods.js';
import * as registry from '../registry/index.js';

class Index {

	static handler(e){
		e.detail.e.preventDefault();
		const eventObj = e.detail.e;
		props.pointer.clientX = eventObj.clientX;
		props.pointer.clientY = eventObj.clientY;
		const target = methods.getClosestContextMenuTarget(eventObj.composedPath()[0]);
		const ids = new Set().add(target.id);
        KIA.actions.share.setSelectionIds(ids);
        const targetEl = KIA.canvasRefMap[target.id];
        targetEl && (props.root.dataset.selectionTagName = targetEl.tagName.toLowerCase());
 
		const menu = registry[target.type];
		if(!menu) return;
		for(let c of props.root.$id.menu.children) c.classList.add('hidden');
		const required = menu.length - props.root.$id.menu.childElementCount;
		if(required > 0) {
			for(let i=1; i<=required; i++) {
				const itemTemplate = props.root.$id.menuItemTemplate.content.cloneNode(true);
				props.root.$id.menu.appendChild(itemTemplate);	
			}			
		}

		[...props.root.$id.menu.children].forEach((c,i)=>{
			const menuItem = menu[i];
			if(!menuItem) return;
			const iconEl = c.querySelector('.icon');
			const iconUseEl = c.querySelector('.icon-use');
			const titleEl = c.querySelector('.title');
			const shortcutEl = c.querySelector('.shortcut');

			c.dataset.action = menuItem.action;
			iconEl.style.setProperty('--fill', menuItem.icon.fill||'none');
			iconUseEl.setAttribute('href', `assets/images/svg-icons.svg#${menuItem.icon.name}-symbol`);
			titleEl.innerText = menuItem.title;
			shortcutEl.innerText = menuItem.shortcut;
			c.classList.remove('hidden');
		})

		props.root.style.left = `${eventObj.clientX}px`;
		props.root.style.top = `${eventObj.clientY}px`;		
		props.root.classList.add('show');
		props.root.dataset.for = target.type;

		const rootElRect = props.root.getBoundingClientRect(); 
		if(rootElRect.bottom > KIA.kiaApp.offsetHeight) props.root.style.top = eventObj.clientY-rootElRect.height+'px';

		KIA.actions.ui.shortcutsKey.pushEscapeStack({
            close: props.root.close,
            id: 'kiaContextMenu',
        });
	}

}

export default Index;

