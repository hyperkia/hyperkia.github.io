const Index = {
	template: `
    
    
    <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>Hyperkia Project</title>
          <script src="data.js"></script>

          <style>
            /* Default */
            .page{background-color: #fff;position: relative;overflow: hidden;isolation: isolate;user-select: none;transform-origin: 0 0;}
            .canvas-layer{background: #d9d9d9;stroke:none;stroke-width: 1px;fill: #d9d9d9;user-select: none;transition: none;caret-color: transparent;pointer-events: auto;display: block;overflow-wrap: anywhere;white-space: pre-wrap;border: 0px solid #000000;position: absolute;}
            .page-svg, svg.canvas-layer {fill: transparent;background-color: transparent;}

            /* Img layer */
            .canvas-layer.imghtml{background-color: transparent;}
            .canvas-layer.imghtml[src=""]{background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-image'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' ry='2'/%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'/%3E%3Cpolyline points='21 15 16 10 5 21'/%3E%3C/svg%3E") center center no-repeat #687787;background-size: 65% auto;}

            /* Text Layer */
            .texthtml{background: transparent;cursor: context-menu;user-select: none;caret-color: transparent;fill: transparent;line-height: normal;}
            .texthtml:focus-visible{outline: none;}
            .texthtml[contenteditable="true"]{cursor: auto;user-select: auto;caret-color: #383838;}
          </style>  

          <style>
            *{margin: 0;padding: 0;box-sizing: border-box;}

            .menu-pages{position: fixed;padding: 20px;top:20px;left:20px;z-index: 999;}

            .menu-pages-btn{background: #0d99ff; color: #fff; border: none;width: 35px;height: 35px;cursor: pointer;position: relative;isolation: isolate;cursor: pointer;}
            .menu-pages-btn svg{width: 20px;}
            .menu-pages-btn input{position: absolute;top: 0;left: 0;width: 100%;height: 100%;opacity: 0;z-index: 1;}

            .menu-pages-list{list-style: none;padding: 0 10px;background: #0d99ff;margin-top: 2px;min-width: 250px;max-height: 0px;transition: 0.3s all linear;overflow: hidden;}
            .menu-pages-list li{font-size: 16px;line-height: 24px;color: #fff;border-bottom: 1px solid #fff;padding: 7px 0;user-select: none;cursor: pointer;}
            .menu-pages-list li:last-child{border-bottom: none;}
            .menu-pages-btn:has(input:checked) + .menu-pages-list{max-height: 70vh;}
          </style>
          <style id="style"></style>
        </head>
        <body>
          <nav class="menu-pages">          
            <button class="menu-pages-btn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="#fff" d="M96 160C96 142.3 110.3 128 128 128L512 128C529.7 128 544 142.3 544 160C544 177.7 529.7 192 512 192L128 192C110.3 192 96 177.7 96 160zM96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320zM544 480C544 497.7 529.7 512 512 512L128 512C110.3 512 96 497.7 96 480C96 462.3 110.3 448 128 448L512 448C529.7 448 544 462.3 544 480z"/></svg>
              <input type="checkbox">
            </button>
            <ul class="menu-pages-list" id="menu-pages-list"></ul>
          </nav>

          <main class="pages" id="pages"></main>

          <script>
            console.log(__HYPERKIA_PROJECT__);
            const obj = {

              els: {
                menuPagesList: document.querySelector('#menu-pages-list'),
                pages: document.querySelector('#pages'),
                style: document.querySelector('#style'),
              },

              renderPagesAsMenu(){
                const html = [];
                for(let [pk, pObj] of Object.entries(__HYPERKIA_PROJECT__.pages)) {
                  html.push(
                    '<li data-menu="' + pk + '">' + pObj.name + '</li>'
                  );
                }
                this.els.menuPagesList.innerHTML = html.join('')
              },

              renderPageByKey(key){
                const pageObj = __HYPERKIA_PROJECT__.pages[key];
                obj.els.style.innerHTML = __HYPERKIA_PROJECT__.style;
                const pageDivEl = document.createElement('div');
                pageDivEl.classList.add('page');
                pageDivEl.innerHTML = __HYPERKIA_PROJECT__.pageInnerHtml[key];
                pageDivEl.dataset.page = key;
                pageDivEl.style.scale = window.innerWidth / parseInt(pageObj.css.width);
                Object.assign(pageDivEl.style, pageObj.css);
                obj.els.pages.innerHTML = '';
                obj.els.pages.appendChild(pageDivEl);

                pageDivEl.querySelectorAll('*').forEach((el)=>{
                  el.removeAttribute('data-name');
                  el.removeAttribute('draggable');
                });

                obj.setImgSrc();
              },

              setImgSrc(){
                const imgEls = document.querySelectorAll('[src^="blob"]');
                imgEls.forEach((imgEl)=>{
                  const lkey = imgEl.dataset.layer;
                  const lObj = __HYPERKIA_PROJECT__.layers[lkey];
                  const srcAssetKey = lObj.assets.src;
                  const assetPath = __HYPERKIA_PROJECT__.assets[srcAssetKey]?.path;
                  if(assetPath) imgEl.src = assetPath;
                })
              },

              pageRenderEvent(){
                obj.els.menuPagesList.addEventListener('click', (e)=>{
                  const pageKey = e.target?.dataset?.menu;
                  if(pageKey) obj.renderPageByKey(pageKey);
                })
              }
            }

            obj.renderPagesAsMenu();
            const firstPageKey = __HYPERKIA_PROJECT__.canvas.pagesOrder[0];
            obj.renderPageByKey(firstPageKey);
            obj.pageRenderEvent();
            
          </script>
        </body>
      </html>
  
	`,
}

export default Index;