import props from '../../utils/props.js';


function extractPage(iframeEl) {
    const pages = {};
    const titleEl = iframeEl.contentDocument.querySelector('title');
    const bodyElCss = window.getComputedStyle(iframeEl.contentDocument.querySelector('body'));

    const key = crypto.randomUUID();
    props.activeParseLayer.pageKey = key;
    pages[key] = {
        key,
        name: titleEl?.innerText || 'New Page',
        css: {
            'background-color': bodyElCss['background-color'],
            width: iframeEl.offsetWidth + 'px',
            height: iframeEl.offsetHeight + 'px',
            'pointer-events': 'auto',
            visibility: 'visible',
            order: Object.keys(KIA.state.pages.map).length + 1,
        },
        layers: [],
        source: 'url',
        createdAt: Date.now(),
    };

    return pages;
}

function filterHtml() {
    const parser = new DOMParser();
    const doc = parser.parseFromString(props.rawhtml, "text/html");

    doc.querySelector('base')?.remove();
    const baseEl = doc.createElement("base");
    baseEl.href = props.htmlurl;
    const headEl = doc.head;
    headEl.prepend(baseEl);

    doc.querySelectorAll('[srcset]').forEach(el=>el.removeAttribute('srcset'));

    props.rawhtml = doc.documentElement.outerHTML;
}

function Index() {
    const iframeEl = document.createElement("iframe");
    props.iframeEl = iframeEl;
    iframeEl.setAttribute("sandbox", "allow-same-origin allow-scripts");

    iframeEl.style = `
        width: 1920px; height: 6000px; position: fixed; top: 0; 
        left:0; opacity: 0; visibility: hidden; pointer-events: none;
    `;

    let loaded = false;

    filterHtml();

    return new Promise((resolve, reject) => {

        iframeEl.addEventListener('load', (e)=>{
            
            const doc = iframeEl.contentDocument;

            if (!doc || !doc.body || doc.body.innerHTML.trim() === '') return;
            if (loaded) return;
            loaded = true;


            const bodyEl = doc.body;

            const pageHeight = bodyEl.scrollHeight;
            iframeEl.style.height = pageHeight + "px";

            const pages = extractPage(iframeEl);
            resolve(pages);
        })

        document.body.appendChild(iframeEl);

        const doc = iframeEl.contentDocument;
        doc.open();
        doc.write(props.rawhtml);
        doc.close();
    });
}

export default Index;