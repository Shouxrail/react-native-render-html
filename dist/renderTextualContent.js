"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const getNativePropsForTNode_1 = __importDefault(require("./helpers/getNativePropsForTNode"));
const renderTextualContent = (props) => {
    return react_1.default.createElement(react_native_1.Text, (0, getNativePropsForTNode_1.default)(props));
};
exports.default = renderTextualContent;
