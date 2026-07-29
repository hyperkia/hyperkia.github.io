
import getElementsInMultiSelectionArea from './getElementsInMultiSelectionArea.js';

// Layer
import drawMultiElementsSelectionBound from './layer/drawMultiElementsSelectionBound.js';
import createSelectionLayersOutline from './layer/createSelectionLayersOutline.js';
import renderLayers from './layer/renderLayers.js';
import resetLayerById from './layer/resetLayerById.js';
import selectionLayerResizeController from './layer/selectionLayerResizeController.js';
import recoverDeletedLayersById from './layer/recoverDeletedLayersById.js';
import deleteLayersById from './layer/deleteLayersById.js';
import resetLayerToUngroup from './layer/resetLayerToUngroup.js';
import resetLayerToGroup from './layer/resetLayerToGroup.js';
import deleteDirtyLayer from './layer/dirty/deleteDirtyLayer.js';
import updateDirtyLayerAttributes from './layer/dirty/updateDirtyLayerAttributes.js';
import updateDirtyLayerStyle from './layer/dirty/updateDirtyLayerStyle.js';
import updateDirtyLayerTagName from './layer/dirty/updateDirtyLayerTagName.js';
import updateDirtyLayerTextContent from './layer/dirty/updateDirtyLayerTextContent.js';
import renderDirtyGroupLayer from './layer/dirty/renderDirtyGroupLayer.js';
import moveDirtyLayerInTree from './layer/dirty/moveDirtyLayerInTree.js';
import renderLayersMissFonts from './layer/dirty/renderLayersMissFonts.js';
import renderDuplicatePasteLayer from './layer/dirty/renderDuplicatePasteLayer.js';


// Page
import createPageName from './page/createPageName.js';
import resetPageById from './page/resetPageById.js';
import setPageNamePosition from './page/setPageNamePosition.js';
import createPage from './page/createPage.js';
import updateDirtyPageTitle from './page/dirty/updateDirtyPageTitle.js';
import updateDirtyPageStyle from './page/dirty/updateDirtyPageStyle.js';
import deleteDirtyPage from './page/dirty/deleteDirtyPage.js';
import deletePagesById from './page/deletePagesById.js';


// Canvas
import updateCanvasStyle from './canvas/updateCanvasStyle.js';
import setCanvasActiveTool from './canvas/setCanvasActiveTool.js';
import setCanvasCurrentAction from './canvas/setCanvasCurrentAction.js';
import setCanvasPositionScale from './canvas/setCanvasPositionScale.js';
import resetCanvas from './canvas/resetCanvas.js';


export default {	
	getElementsInMultiSelectionArea,

	drawMultiElementsSelectionBound,
	createSelectionLayersOutline,
	renderLayers,
	resetLayerById,
	selectionLayerResizeController,
	recoverDeletedLayersById,
	deleteLayersById,
	resetLayerToUngroup,
	resetLayerToGroup,
	deleteDirtyLayer,
	updateDirtyLayerAttributes,
	updateDirtyLayerStyle,
	updateDirtyLayerTagName,
	updateDirtyLayerTextContent,
	renderDirtyGroupLayer,
	renderLayersMissFonts,
	moveDirtyLayerInTree,
	renderDuplicatePasteLayer,

	createPageName,
	resetPageById,
	setPageNamePosition,
	createPage,
	updateDirtyPageTitle,
	updateDirtyPageStyle,
	deleteDirtyPage,
	deletePagesById,
	
	updateCanvasStyle,
	setCanvasActiveTool,
	setCanvasCurrentAction,
	setCanvasPositionScale,
	resetCanvas,

}
