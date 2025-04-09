"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = IMGElementContentLoading;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
/**
 * Default loading view for the {@link IMGElement} component.
 */
function IMGElementContentLoading({ dimensions, children }) {
    return (react_1.default.createElement(react_native_1.View, { style: dimensions, testID: "image-loading" }, children));
}
