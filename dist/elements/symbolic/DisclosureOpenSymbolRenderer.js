"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DisclosureOpenSymbolRenderer;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const useSymbolicMarkerRendererStyles_1 = __importDefault(require("./useSymbolicMarkerRendererStyles"));
function DisclosureOpenSymbolRenderer(props) {
    const { prefixStyle: { top }, prefixSize } = (0, useSymbolicMarkerRendererStyles_1.default)(props, 1);
    return react_1.default.createElement(react_native_1.View, {
        style: {
            top,
            width: 0,
            height: 0,
            borderStyle: 'solid',
            borderTopWidth: prefixSize,
            borderTopColor: props.color,
            borderLeftWidth: prefixSize / 2,
            borderLeftColor: 'transparent',
            borderRightWidth: prefixSize / 2,
            borderRightColor: 'transparent'
        }
    });
}
