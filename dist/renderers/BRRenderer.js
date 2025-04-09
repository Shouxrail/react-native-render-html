"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const emptyProps = {
    testID: 'br'
};
const isWeb = react_native_1.Platform.OS === 'web';
function renderEmptyLineBreak(tnode) {
    const lineHeight = tnode.styles.nativeTextFlow.lineHeight ||
        tnode.styles.nativeTextFlow.fontSize * 1.4;
    return react_1.default.createElement(react_native_1.View, { style: { height: lineHeight } });
}
const BRRenderer = function BRRenderer({ renderIndex, renderLength, sharedProps, tnode }) {
    // If it is the last child and BR collapsing is enabled, render an empty
    // string to prevent inserting an undesired space to follow HTML specs,
    // unless the platform is web and it is also the first child.
    //
    // Note that we are taking advantage of the Ghost Line oddity in React
    // Native, where an empty <Text /> element displays a line, since a
    // line break opening **and** closing an inline formatting context
    // should be printed as a one line-height item.
    const isFirst = renderIndex === 0;
    const isLast = renderIndex === renderLength - 1;
    const isLonelyBreak = isFirst && isLast;
    const shouldCollapse = sharedProps.enableExperimentalBRCollapsing &&
        (isFirst ? isLast && !isWeb : isLast);
    return isLonelyBreak && shouldCollapse
        ? renderEmptyLineBreak(tnode)
        : react_1.default.createElement(react_native_1.Text, emptyProps, shouldCollapse ? '' : '\n');
};
BRRenderer.isNativeInternalTextRenderer = true;
exports.default = BRRenderer;
