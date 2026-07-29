
let debounceTimeout = null;

function Index(payload){
	let selectionId = KIA.state.ui.getSelectionId();
	selectionId = KIA.dom.read.getClosestHtmlKindIdById(selectionId);
	const layerObj = KIA.nodesMap[selectionId];
	if(!layerObj) return;

	const historyItem = {
		flag: 'moveSelectionInSameParent',
		selectionId,
		undo: {
			selectionStyle: {
				left: layerObj.style.left,
				top: layerObj.style.top,
			}
		}
	}

	let layerLeft = parseInt(layerObj.style.left);
	let layerTop = parseInt(layerObj.style.top);
	switch (payload.direction) {
		case 'right':
			layerLeft += payload.step;
			break;
		case 'left':
			layerLeft -= payload.step;
			break;
		case 'down':
			layerTop += payload.step;
			break;
		case 'up':
			layerTop -= payload.step;
			break;
	}

	const newLayerObj = {
		id: layerObj.id,
		style: {
			left: layerLeft+'px',
			top: layerTop+'px',
		}
	}

    KIA.state.ui.setDirtyMap({
        layer: {
            id: layerObj.id,
            style: Object.keys(newLayerObj.style),
            flag: 'style',
            flagType: 'moving'
        }
    });    
    KIA.state.layers.movingLayer(newLayerObj);
    KIA.state.ui.resetDirtyMap();

    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        const layerObj = KIA.nodesMap[newLayerObj.id];
		KIA.services.idb.core.replaceObjectByKey('layers', layerObj);

		historyItem.redo = {
			selectionStyle: structuredClone(newLayerObj.style),
		}
		KIA.actions.ui.history.addItem(historyItem);
    }, 150);    
}

export default Index;