"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIMGState = getIMGState;
const extractImageStyleProps_1 = __importDefault(require("./extractImageStyleProps"));
function getIMGState({ error, alt, altColor, source, containerStyle, concreteDimensions, initialDimensions, objectFit, onError }) {
    if (error) {
        return {
            type: 'error',
            alt,
            altColor,
            source,
            error,
            containerStyle,
            dimensions: concreteDimensions !== null && concreteDimensions !== void 0 ? concreteDimensions : initialDimensions
        };
    }
    if (concreteDimensions != null) {
        return {
            type: 'success',
            alt,
            altColor,
            source,
            onError,
            containerStyle,
            imageStyle: (0, extractImageStyleProps_1.default)(containerStyle, objectFit),
            dimensions: concreteDimensions
        };
    }
    return {
        type: 'loading',
        alt,
        altColor,
        source,
        containerStyle,
        dimensions: initialDimensions
    };
}
