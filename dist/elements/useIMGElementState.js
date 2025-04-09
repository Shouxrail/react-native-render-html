"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useIMGElementState;
const react_1 = require("react");
const react_native_1 = require("react-native");
const defaultInitialImageDimensions_1 = __importDefault(require("./defaultInitialImageDimensions"));
const useIMGNormalizedSource_1 = __importDefault(require("./useIMGNormalizedSource"));
const useImageConcreteDimensions_1 = __importDefault(require("./useImageConcreteDimensions"));
const getIMGState_1 = require("./getIMGState");
const useImageSpecifiedDimensions_1 = __importDefault(require("./useImageSpecifiedDimensions"));
function getImageSizeAsync({ uri, headers }) {
    return new Promise((onsuccess, onerror) => {
        const onImageDimensionsSuccess = (width, height) => onsuccess({ width, height });
        if (headers) {
            react_native_1.Image.getSizeWithHeaders(uri, headers, onImageDimensionsSuccess, onerror);
        }
        else {
            react_native_1.Image.getSize(uri, onImageDimensionsSuccess, onerror);
        }
    });
}
function useImageNaturalDimensions(props) {
    const { source, cachedNaturalDimensions } = props;
    const [naturalDimensions, setNaturalDimensions] = (0, react_1.useState)(cachedNaturalDimensions || null);
    const { width: cachedNaturalWidth, height: cachedNaturalHeight } = cachedNaturalDimensions || {};
    const [error, setError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(function resetOnURIChange() {
        setNaturalDimensions((cachedNaturalWidth != null && cachedNaturalHeight != null
            ? { width: cachedNaturalWidth, height: cachedNaturalHeight }
            : null));
        setError(null);
    }, [cachedNaturalHeight, cachedNaturalWidth, source.uri]);
    return {
        onNaturalDimensions: setNaturalDimensions,
        onError: setError,
        naturalDimensions,
        error
    };
}
function useFetchedNaturalDimensions(props) {
    const { source, cachedNaturalDimensions } = props;
    const { error, naturalDimensions, onError, onNaturalDimensions } = useImageNaturalDimensions(props);
    const hasCachedDimensions = !!cachedNaturalDimensions;
    (0, react_1.useEffect)(function fetchPhysicalDimensions() {
        let cancelled = false;
        if (source.uri && !hasCachedDimensions) {
            getImageSizeAsync({ uri: source.uri, headers: source.headers })
                .then((dimensions) => !cancelled && onNaturalDimensions(dimensions))
                .catch((e) => !cancelled && onError(e || {}));
            return () => {
                cancelled = true;
            };
        }
    }, [
        source.uri,
        source.headers,
        onNaturalDimensions,
        onError,
        hasCachedDimensions
    ]);
    return {
        naturalDimensions,
        error,
        onError,
        onNaturalDimensions
    };
}
/**
 * This hook will compute concrete dimensions from image natural dimensions and
 * constraints. It will fetch the image and get its dimensions.
 *
 * @remarks If you know the dimensions beforehand, use
 * {@link useIMGElementStateWithCache} instead to save a network request and
 * prevent a layout shift.
 */
function useIMGElementState(props) {
    const { alt, altColor, source, contentWidth, computeMaxWidth, objectFit, initialDimensions = defaultInitialImageDimensions_1.default, cachedNaturalDimensions } = props;
    const { flatStyle, specifiedDimensions } = (0, useImageSpecifiedDimensions_1.default)(props);
    const nomalizedSource = (0, useIMGNormalizedSource_1.default)({
        specifiedDimensions,
        source
    });
    const { naturalDimensions, onError, error } = useFetchedNaturalDimensions({
        source: nomalizedSource,
        specifiedDimensions,
        cachedNaturalDimensions
    });
    const concreteDimensions = (0, useImageConcreteDimensions_1.default)({
        flatStyle,
        naturalDimensions,
        specifiedDimensions,
        computeMaxWidth,
        contentWidth
    });
    return (0, getIMGState_1.getIMGState)({
        error,
        alt,
        altColor,
        concreteDimensions,
        containerStyle: flatStyle,
        initialDimensions,
        objectFit,
        onError,
        source: nomalizedSource
    });
}
