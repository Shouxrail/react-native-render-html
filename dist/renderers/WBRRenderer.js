"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const emptyProps = {};
const WBRRenderer = function WordBreakRenderer() {
    return react_1.default.createElement(react_native_1.Text, emptyProps, '\u200b');
};
WBRRenderer.isNativeInternalTextRenderer = true;
exports.default = WBRRenderer;
