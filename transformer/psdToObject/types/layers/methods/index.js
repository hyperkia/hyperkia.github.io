import normalizeGroupTagName from "./normalizeGroupTagName.js";
import norGroupSGroupTagName from "./norGroupSGroupTagName.js";
import createSvgParentTopGroup from "./createSvgParentTopGroup.js";
import normalizeSvgBounds from "./normalizeSvgBounds.js";
import createSvgParentShape from "./createSvgParentShape.js";
import getShapePath from "./getShapePath.js";
import extractEffectGradientOverlay from "./extractEffectGradientOverlay.js";
import extractVectorFillGradient from "./extractVectorFillGradient.js";
import extractFontSize from "./extractFontSize.js";
import extractLineHeight from "./extractLineHeight.js";
import extractWidth from "./extractWidth.js";
import extractHeight from "./extractHeight.js";
import gradientToCSS from "./gradientToCSS.js";
import normalizeRichTextContent from "./normalizeRichTextContent.js";
import normalizeTextLayerLineHeight from "./normalizeTextLayerLineHeight.js";
import normalizeSvgImage from "./normalizeSvgImage.js";
import normalizeMixBlendMode from "./normalizeMixBlendMode.js";
import normalizeLayersPosition from "./normalizeLayersPosition.js";
import normalizeRectLikePathShape from "./normalizeRectLikePathShape.js";
import normalizeRectShape from "./normalizeRectShape.js";
import normalizeCircleLikePathShape from "./normalizeCircleLikePathShape.js";
import normalizeNonMaskContextSvgTextLayer from "./normalizeNonMaskContextSvgTextLayer.js";
import normalizeTextLayerHeight from "./normalizeTextLayerHeight.js";
import createSvgParentShapeNoGroup from "./createSvgParentShapeNoGroup.js";
import hostCommonStyleToParentInRichtext from "./hostCommonStyleToParentInRichtext.js";
import norPointTextTopPosition from "./norPointTextTopPosition.js";
import norRichTextContentLineHeight from "./norRichTextContentLineHeight.js";


export default {
	normalizeGroupTagName,
	norGroupSGroupTagName,
	createSvgParentTopGroup,
	normalizeSvgBounds,
	createSvgParentShape,
	getShapePath,
	extractEffectGradientOverlay,
	extractVectorFillGradient,
	extractFontSize,
	extractLineHeight,
	extractWidth,
	extractHeight,
	gradientToCSS,
	normalizeRichTextContent,
	normalizeTextLayerLineHeight,
	normalizeSvgImage,
	normalizeMixBlendMode,
	normalizeLayersPosition,
	normalizeRectLikePathShape,
	normalizeRectShape,
	normalizeCircleLikePathShape,
	normalizeNonMaskContextSvgTextLayer,
	normalizeTextLayerHeight,
	createSvgParentShapeNoGroup,
	hostCommonStyleToParentInRichtext,
	norPointTextTopPosition,
	norRichTextContentLineHeight,
};