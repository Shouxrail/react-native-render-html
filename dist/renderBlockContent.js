"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const GenericPressable_1 = __importDefault(require("./GenericPressable"));
const getNativePropsForTNode_1 = __importDefault(require("./helpers/getNativePropsForTNode"));
const react_native_1 = require("react-native");
function renderBlockContent(props) {
    const nativeProps = (0, getNativePropsForTNode_1.default)(props);
    return react_1.default.createElement(typeof nativeProps.onPress === 'function' ? GenericPressable_1.default : react_native_1.View, nativeProps);
}
exports.default = renderBlockContent;
