import setUniqueIdToNodes from "./setUniqueIdToNodes.js";
import createNodeParentChildren from "./createNodeParentChildren.js";
import normalizeAssets from "./normalizeAssets.js";
import normalizeTextLayerParentHeight from "./normalizeTextLayerParentHeight.js";
import normalizeProjectFont from "./normalizeProjectFont.js";
import isAncestor from "./isAncestor.js";
import detectAnyChildClipping from "./detectAnyChildClipping.js";
import ancestorHasAnyClippingChild from "./ancestorHasAnyClippingChild.js";
import normalizeColorAsSrgb from "./normalizeColorAsSrgb.js";
import isAnyNextSiblingClipping from "./isAnyNextSiblingClipping.js";
import getGradientStack from "./getGradientStack.js";
import getLayersBounds from "./getLayersBounds.js";
import getAllNestedChildrens from "./getAllNestedChildrens.js";



export default {
	setUniqueIdToNodes,
	createNodeParentChildren,
	normalizeAssets,
	normalizeTextLayerParentHeight,
	normalizeProjectFont,
	isAncestor,
	detectAnyChildClipping,
	ancestorHasAnyClippingChild,
	normalizeColorAsSrgb,
	isAnyNextSiblingClipping,
	getGradientStack,
	getLayersBounds,
	getAllNestedChildrens,
};