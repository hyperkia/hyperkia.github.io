const Index = {
    SVGNS: 'http://www.w3.org/2000/svg',
	filterTypes: [ "blur", "brightness", "contrast", "grayscale", 
		"hue-rotate", "invert", "opacity", "saturate", "sepia"],
	acceptedFormats: ['image/png','image/jpeg','image/gif',
	'image/svg+xml','image/webp', 'image/avif'],
	newPageObject: {	
        title: 'New Page',
        style: {
            'background-color': '#ffffffff',
            width: '1920px',
            height: '6000px',
        },
        children: [],
        instanceof: 'document',
        createdAt: Date.now(),
        source: 'hyperkia',
	},
    defaultProjectFont: {
        Poppins: {
          i: "123456789",
          n: "123456789"
        }
    },
    supportShortcutKeys: new Set(['space', 'arrowleft', 'arrowup', 'arrowright', 'arrowdown', 'controlleft']),
    supportShortcutCtrlKeys: new Set(['keyd','keyg']),
    supportShortcutShiftKeys: new Set(['arrowleft', 'arrowup', 'arrowright', 'arrowdown']),
    supportShortcutCtrlShiftKeys: new Set(['keyh', 'keyl']),
    skipRepeatShortcutCtrlKeys: new Set(['keyd','keyv','keyc','keyg']),
    svgShapes: ['path','circle','rect','ellipse','line','g','polyline','polygon'],    
};

export default Index;