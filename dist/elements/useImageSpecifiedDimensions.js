"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useImageSpecifiedDimensions;
const react_1 = require("react");
const getDimensionsWithAspectRatio_1 = __importDefault(require("./getDimensionsWithAspectRatio"));
const react_native_1 = require("react-native");
function normalizeSize(dimension, options) {
    const containerDimension = options.containerDimension || null;
    const enablePercentWidth = options.enablePercentWidth || false;
    if (dimension === null ||
        dimension === undefined ||
        Number.isNaN(dimension)) {
        return null;
    }
    if (typeof dimension === 'number') {
        return dimension;
    }
    if (dimension.search('%') !== -1 &&
        enablePercentWidth &&
        typeof containerDimension === 'number') {
        return (parseFloat(dimension) * containerDimension) / 100;
    }
    else if (dimension.trim().match(/^[\d.]+$/)) {
        return parseFloat(dimension);
    }
    return null;
}
/**
 * Extract specified dimensions from props.
 */
function deriveSpecifiedDimensionsFromProps({ width, height, contentWidth, flatStyle, enableExperimentalPercentWidth: enablePercentWidth }) {
    const normalizeOptionsWidth = {
        enablePercentWidth,
        containerDimension: contentWidth
    };
    const normalizeOptionsHeight = {
        enablePercentWidth: false
    };
    const widthProp = normalizeSize(width, normalizeOptionsWidth);
    const heightProp = normalizeSize(height, normalizeOptionsHeight);
    const styleWidth = normalizeSize(flatStyle.width, normalizeOptionsWidth);
    const styleHeight = normalizeSize(flatStyle.height, normalizeOptionsHeight);
    return (0, getDimensionsWithAspectRatio_1.default)(styleWidth !== null && styleWidth !== void 0 ? styleWidth : widthProp, styleHeight !== null && styleHeight !== void 0 ? styleHeight : heightProp, flatStyle.aspectRatio);
}
function useImageSpecifiedDimensions(props) {
    const { contentWidth, enableExperimentalPercentWidth, style, width, height } = props;
    const flatStyle = (0, react_1.useMemo)(() => react_native_1.StyleSheet.flatten(style) || {}, [style]);
    const specifiedDimensions = (0, react_1.useMemo)(() => deriveSpecifiedDimensionsFromProps({
        contentWidth,
        enableExperimentalPercentWidth,
        width,
        height,
        flatStyle
    }), [contentWidth, enableExperimentalPercentWidth, flatStyle, height, width]);
    return { flatStyle, specifiedDimensions };
}
