"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SquareSymbolRenderer;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const useSymbolicMarkerRendererStyles_1 = __importDefault(require("./useSymbolicMarkerRendererStyles"));
function SquareSymbolRenderer(props) {
    const { prefixStyle } = (0, useSymbolicMarkerRendererStyles_1.default)(props, 1.2);
    return react_1.default.createElement(react_native_1.View, {
        style: Object.assign({ backgroundColor: props.color }, prefixStyle)
    });
}
