"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTNodeChildrenProps = useTNodeChildrenProps;
const SharedPropsProvider_1 = require("./context/SharedPropsProvider");
const renderChildren_1 = __importDefault(require("./renderChildren"));
function isCollapsible(tnode) {
    return tnode.type === 'block' || tnode.type === 'phrasing';
}
/**
 * A hook especially useful when one need to tamper with children in a custom
 * renderer. Should be used with {@link TChildrenRenderer}.
 */
function useTNodeChildrenProps({ tnode, propsForChildren, disableMarginCollapsing = false, renderChild }) {
    const { enableExperimentalMarginCollapsing } = (0, SharedPropsProvider_1.useSharedProps)();
    const shouldCollapseChildren = enableExperimentalMarginCollapsing &&
        !disableMarginCollapsing &&
        isCollapsible(tnode);
    return {
        propsForChildren,
        disableMarginCollapsing: !shouldCollapseChildren,
        tchildren: tnode.children,
        renderChild
    };
}
/**
 * A component to render all children of a {@link TNode}.
 */
function TNodeChildrenRenderer({ tnode, propsForChildren, disableMarginCollapsing = false, renderChild }) {
    if (tnode.type === 'text') {
        // see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20544
        return tnode.data;
    }
    return (0, renderChildren_1.default)(useTNodeChildrenProps({
        tnode,
        propsForChildren,
        disableMarginCollapsing,
        renderChild
    }));
}
exports.default = TNodeChildrenRenderer;
