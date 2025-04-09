"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useAssembledCommonProps;
const mergeCollapsedMargins_1 = __importDefault(require("../helpers/mergeCollapsedMargins"));
const RenderRegistryProvider_1 = require("../context/RenderRegistryProvider");
const SharedPropsProvider_1 = require("../context/SharedPropsProvider");
/**
 * @internal
 */
function useAssembledCommonProps({ tnode, propsFromParent, sharedProps, renderIndex, renderLength, TNodeChildrenRenderer }, TDefault) {
    const { Default, Custom } = (0, RenderRegistryProvider_1.useRendererConfig)(tnode);
    const containerProps = (0, SharedPropsProvider_1.useDefaultContainerProps)();
    const assembledProps = Object.assign({ tnode,
        propsFromParent,
        sharedProps, TDefaultRenderer: TDefault, TNodeChildrenRenderer, style: (0, mergeCollapsedMargins_1.default)(propsFromParent === null || propsFromParent === void 0 ? void 0 : propsFromParent.collapsedMarginTop, tnode.getNativeStyles()), type: tnode.type === 'text' || tnode.type === 'phrasing' ? 'text' : 'block', propsForChildren: tnode.tagName ? {} : propsFromParent, InternalRenderer: Default || TDefault, renderIndex,
        renderLength }, containerProps);
    return {
        assembledProps,
        Renderer: Custom || Default || null
    };
}
