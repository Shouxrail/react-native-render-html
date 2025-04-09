"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = IMGElementContentError;
const react_1 = __importDefault(require("react"));
const IMGElementContentAlt_1 = __importDefault(require("./IMGElementContentAlt"));
/**
 * Default error view for the {@link IMGElement} component.
 */
function IMGElementContentError(props) {
    return react_1.default.createElement(IMGElementContentAlt_1.default, Object.assign({}, props, { testID: "image-error" }));
}
