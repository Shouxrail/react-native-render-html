"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useIMGElementStateWithCache;
const defaultInitialImageDimensions_1 = __importDefault(require("./defaultInitialImageDimensions"));
const getIMGState_1 = require("./getIMGState");
const useImageConcreteDimensions_1 = __importDefault(require("./useImageConcreteDimensions"));
const useImageSpecifiedDimensions_1 = __importDefault(require("./useImageSpecifiedDimensions"));
const useIMGNormalizedSource_1 = __importDefault(require("./useIMGNormalizedSource"));
/**
 * This hook is useful when one has access to image natural dimensions prior to
 * loading. The `cachedNaturalDimensions` prop must be passed to immediately
 * compute concrete dimensions.
 */
function useIMGElementStateWithCache(props) {
    const { alt, altColor, source, contentWidth, computeMaxWidth, objectFit, initialDimensions = defaultInitialImageDimensions_1.default, cachedNaturalDimensions } = props;
    const { flatStyle, specifiedDimensions } = (0, useImageSpecifiedDimensions_1.default)(props);
    const nomalizedSource = (0, useIMGNormalizedSource_1.default)({
        specifiedDimensions,
        source
    });
    const concreteDimensions = (0, useImageConcreteDimensions_1.default)({
        flatStyle,
        naturalDimensions: cachedNaturalDimensions,
        specifiedDimensions,
        computeMaxWidth,
        contentWidth
    });
    return (0, getIMGState_1.getIMGState)({
        error: null,
        concreteDimensions,
        containerStyle: flatStyle,
        initialDimensions,
        objectFit,
        source: nomalizedSource,
        alt,
        altColor
    });
}
