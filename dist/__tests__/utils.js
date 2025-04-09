"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractTextFromInstance = extractTextFromInstance;
exports.expectTranslatedInlineCSSRuleTo = expectTranslatedInlineCSSRuleTo;
exports.expectTranslatedInlineCSSToMatchObject = expectTranslatedInlineCSSToMatchObject;
exports.expectTranslatedInlineCSSValueToEqual = expectTranslatedInlineCSSValueToEqual;
exports.elementHasAncestorOfType = elementHasAncestorOfType;
exports.getLastAncestorOfType = getLastAncestorOfType;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const RenderHTML_1 = __importDefault(require("../RenderHTML"));
function extractTextFromInstance(instance) {
    const textChunks = [];
    const texts = instance.findAllByType(react_native_1.Text);
    for (const text of texts) {
        if (typeof text.props.children === 'string') {
            textChunks.push(text.props.children);
        }
    }
    return textChunks.join('');
}
function expectTranslatedInlineCSSRuleTo({ cssInlineRules, test, render, extraProps }) {
    const { getByText } = render(react_1.default.createElement(RenderHTML_1.default, Object.assign({ debug: false, enableUserAgentStyles: false, enableCSSInlineProcessing: true, baseStyle: {}, source: { html: `<span style="${cssInlineRules}">hello world</span>` } }, extraProps)));
    const text = getByText('hello world');
    // eslint-disable-next-line jest/no-disabled-tests
    test(react_native_1.StyleSheet.flatten(text.props.style));
}
function expectTranslatedInlineCSSToMatchObject({ cssInlineRules, reactNativeStyle, render }) {
    expectTranslatedInlineCSSRuleTo({
        render,
        cssInlineRules,
        test: (flatStyle) => expect(flatStyle).toMatchObject(reactNativeStyle)
    });
}
function expectTranslatedInlineCSSValueToEqual({ cssInlineRules, reactNativePropStyleName, render, value, extraProps }) {
    expectTranslatedInlineCSSRuleTo({
        cssInlineRules,
        render,
        test: (style) => expect(style[reactNativePropStyleName]).toEqual(value),
        extraProps
    });
}
function elementHasAncestorOfType(element, Type) {
    let el = element;
    while ((el = el === null || el === void 0 ? void 0 : el.parent) != null) {
        if (el.type === Type) {
            return true;
        }
    }
    return false;
}
function getLastAncestorOfType(element, Type) {
    let el = element;
    const elsOfType = [];
    while ((el = el === null || el === void 0 ? void 0 : el.parent) != null) {
        if (el.type === Type) {
            elsOfType.push(el);
        }
    }
    if (elsOfType.length > 0) {
        return elsOfType[elsOfType.length - 1];
    }
    return null;
}
