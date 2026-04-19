
import updateDirtyLayerTextContent from './setselection/updateDirtyLayerTextContent.js';
import deleteDirtyLayer from './dirtyLayer/deleteDirtyLayer.js';
import deleteSelectedPage from './setselection/deleteSelectedPage.js';

import renderLayers from './layer/renderLayers.js';

import createSelectionLayersOutline from './createSelectionLayersOutline.js';
import drawMultiElementsSelectionBound from './drawMultiElementsSelectionBound.js';
import getElementsInMultiSelectionArea from './getElementsInMultiSelectionArea.js';
import setCanvasCurrentAction from './setCanvasCurrentAction.js';
import setPageNamePosition from './setPageNamePosition.js';
import setCanvasPositionScale from './setCanvasPositionScale.js';
import setSelectionPageTitle from './setSelectionPageTitle.js';
import createPage from './createPage.js';
import createPageName from './createPageName.js';
import updateCanvasStyle from './updateCanvasStyle.js';
import setCanvasActiveTool from './setCanvasActiveTool.js';

import updateDirtyLayerAttributes from './dirtyLayer/updateDirtyLayerAttributes.js';
import updateDirtyLayerStyle from './dirtyLayer/updateDirtyLayerStyle.js';
import updateDirtyLayerNodeName from './dirtyLayer/updateDirtyLayerNodeName.js';

import updatePageSelectionStyle from './selection-page/updatePageSelectionStyle.js';
import moveLayerInTree from './moveLayerInTree.js';



export default {	
	updateDirtyLayerTextContent,
	deleteDirtyLayer,
	deleteSelectedPage,

	renderLayers,
	
	createSelectionLayersOutline,
	drawMultiElementsSelectionBound,
	getElementsInMultiSelectionArea,
	setCanvasCurrentAction,
	setPageNamePosition,
	setCanvasPositionScale,
	setSelectionPageTitle,
	createPage,
	createPageName,
	updateCanvasStyle,
	setCanvasActiveTool,

	updateDirtyLayerAttributes,

	updateDirtyLayerStyle,
	updateDirtyLayerNodeName,

	updatePageSelectionStyle,
	moveLayerInTree,
};
