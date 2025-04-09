"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAElementProps = useAElementProps;
const react_1 = __importDefault(require("react"));
const useNormalizedUrl_1 = __importDefault(require("../hooks/useNormalizedUrl"));
const DocumentMetadataProvider_1 = require("../context/DocumentMetadataProvider");
const RenderersPropsProvider_1 = require("../context/RenderersPropsProvider");
function useAnchorOnLinkPress(tnode, onPress) {
    const href = tnode.attributes.href;
    const normalizedHref = (0, useNormalizedUrl_1.default)(href);
    const { baseTarget } = (0, DocumentMetadataProvider_1.useDocumentMetadata)();
    const shouldHandleLinkPress = tnode.tagName === 'a' &&
        typeof normalizedHref === 'string' &&
        href.length > 0 &&
        typeof onPress === 'function';
    return shouldHandleLinkPress
        ? (e) => onPress(e, normalizedHref, tnode.attributes, tnode.attributes.target ||
            baseTarget)
        : undefined;
}
function useAElementProps(props) {
    const { tnode } = props;
    const { onPress } = (0, RenderersPropsProvider_1.useRendererProps)('a');
    const syntheticAnchorOnLinkPress = useAnchorOnLinkPress(tnode, onPress);
    if (typeof syntheticAnchorOnLinkPress !== 'function') {
        return props;
    }
    return Object.assign(Object.assign({}, props), { onPress: syntheticAnchorOnLinkPress });
}
const ARenderer = (props) => {
    return react_1.default.createElement(props.TDefaultRenderer, useAElementProps(props));
};
exports.default = ARenderer;
