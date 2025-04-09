"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOLElementProps = useOLElementProps;
const react_1 = __importDefault(require("react"));
const OLElement_1 = __importDefault(require("../elements/OLElement"));
const RenderersPropsProvider_1 = require("../context/RenderersPropsProvider");
function getFallbackListStyleTypeFromNestLevel(nestLevel) {
    switch (nestLevel % 3) {
        case 0:
            return 'decimal';
        /* istanbul ignore next */
        case 1:
            return 'upper-alpha';
        /* istanbul ignore next */
        default:
            return 'lower-alpha';
    }
}
function useOLElementProps(props) {
    const config = (0, RenderersPropsProvider_1.useRendererProps)('ol');
    return Object.assign(Object.assign(Object.assign({}, props), { getFallbackListStyleTypeFromNestLevel }), config);
}
const OLRenderer = (props) => {
    return react_1.default.createElement(OLElement_1.default, useOLElementProps(props));
};
exports.default = OLRenderer;
