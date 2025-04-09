"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useULElementProps = useULElementProps;
const react_1 = __importDefault(require("react"));
const ULElement_1 = __importDefault(require("../elements/ULElement"));
const RenderersPropsProvider_1 = require("../context/RenderersPropsProvider");
function getFallbackListStyleTypeFromNestLevel(nestLevel) {
    switch (nestLevel % 3) {
        case 0:
            return 'disc';
        /* istanbul ignore next */
        case 1:
            return 'circle';
        /* istanbul ignore next */
        default:
            return 'square';
    }
}
function useULElementProps(props) {
    const config = (0, RenderersPropsProvider_1.useRendererProps)('ul');
    return Object.assign(Object.assign(Object.assign({}, props), { getFallbackListStyleTypeFromNestLevel }), config);
}
const ULRenderer = (props) => {
    return react_1.default.createElement(ULElement_1.default, useULElementProps(props));
};
exports.default = ULRenderer;
