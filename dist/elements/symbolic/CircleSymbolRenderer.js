"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CircleSymbolRenderer;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const useSymbolicMarkerRendererStyles_1 = __importDefault(require("./useSymbolicMarkerRendererStyles"));
function CircleSymbolRenderer(props) {
    const { prefixSize, prefixStyle } = (0, useSymbolicMarkerRendererStyles_1.default)(props);
    const style = Object.assign({ borderColor: props.color, borderWidth: prefixSize / 10, borderRadius: prefixSize }, prefixStyle);
    return react_1.default.createElement(react_native_1.View, { style: style });
}
