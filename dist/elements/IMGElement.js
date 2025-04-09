"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const prop_types_1 = __importDefault(require("prop-types"));
const useIMGElementState_1 = __importDefault(require("./useIMGElementState"));
const IMGElementContentSuccess_1 = __importDefault(require("./IMGElementContentSuccess"));
const IMGElementContainer_1 = __importDefault(require("./IMGElementContainer"));
const IMGElementContentLoading_1 = __importDefault(require("./IMGElementContentLoading"));
const IMGElementContentError_1 = __importDefault(require("./IMGElementContentError"));
const defaultInitialImageDimensions_1 = __importDefault(require("./defaultInitialImageDimensions"));
function identity(arg) {
    return arg;
}
/**
 * A component to render images based on an internal loading state.
 */
function IMGElement({ source, alt, altColor, height, width, style = {}, computeMaxWidth = identity, contentWidth, enableExperimentalPercentWidth = false, initialDimensions = defaultInitialImageDimensions_1.default, onPress, testID, objectFit, cachedNaturalDimensions, containerProps }) {
    const props = {
        source,
        alt,
        altColor,
        height,
        width,
        style,
        computeMaxWidth,
        contentWidth,
        enableExperimentalPercentWidth,
        initialDimensions,
        onPress,
        testID,
        objectFit,
        cachedNaturalDimensions,
        containerProps
    };
    const state = (0, useIMGElementState_1.default)(props);
    let content;
    if (state.type === 'success') {
        content = react_1.default.createElement(IMGElementContentSuccess_1.default, Object.assign({}, state));
    }
    else if (state.type === 'loading') {
        content = react_1.default.createElement(IMGElementContentLoading_1.default, Object.assign({}, state));
    }
    else {
        content = react_1.default.createElement(IMGElementContentError_1.default, Object.assign({}, state));
    }
    return (react_1.default.createElement(IMGElementContainer_1.default, Object.assign({ testID: testID }, containerProps, { onPress: onPress, style: state.containerStyle }), content));
}
const imgDimensionsType = prop_types_1.default.shape({
    width: prop_types_1.default.number,
    height: prop_types_1.default.number
});
IMGElement.propTypes = {
    source: prop_types_1.default.object.isRequired,
    alt: prop_types_1.default.string,
    altColor: prop_types_1.default.string,
    height: prop_types_1.default.oneOfType([prop_types_1.default.string, prop_types_1.default.number]),
    width: prop_types_1.default.oneOfType([prop_types_1.default.string, prop_types_1.default.number]),
    style: prop_types_1.default.oneOfType([prop_types_1.default.object, prop_types_1.default.array]),
    computeMaxWidth: prop_types_1.default.func.isRequired,
    contentWidth: prop_types_1.default.number,
    enableExperimentalPercentWidth: prop_types_1.default.bool,
    initialDimensions: imgDimensionsType,
    onPress: prop_types_1.default.func,
    testID: prop_types_1.default.string,
    objectFit: prop_types_1.default.string,
    cachedNaturalDimensions: imgDimensionsType,
    containerProps: prop_types_1.default.object
};
exports.default = IMGElement;
