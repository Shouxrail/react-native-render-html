"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TDefaultTextRenderer = exports.TDefaultPhrasingRenderer = exports.TDefaultBlockRenderer = void 0;
const react_1 = __importStar(require("react"));
const SharedPropsProvider_1 = require("./context/SharedPropsProvider");
const useAssembledCommonProps_1 = __importDefault(require("./hooks/useAssembledCommonProps"));
const TChildrenRendererContext_1 = require("./context/TChildrenRendererContext");
const renderTextualContent_1 = __importDefault(require("./renderTextualContent"));
const RenderRegistryProvider_1 = require("./context/RenderRegistryProvider");
const renderBlockContent_1 = __importDefault(require("./renderBlockContent"));
const renderEmptyContent_1 = __importDefault(require("./renderEmptyContent"));
const TDefaultBlockRenderer = renderBlockContent_1.default.bind(null);
exports.TDefaultBlockRenderer = TDefaultBlockRenderer;
TDefaultBlockRenderer.displayName = 'TDefaultBlockRenderer';
const TDefaultPhrasingRenderer = renderTextualContent_1.default.bind(null);
exports.TDefaultPhrasingRenderer = TDefaultPhrasingRenderer;
TDefaultPhrasingRenderer.displayName = 'TDefaultPhrasingRenderer';
const TDefaultTextRenderer = renderTextualContent_1.default.bind(null);
exports.TDefaultTextRenderer = TDefaultTextRenderer;
TDefaultTextRenderer.displayName = 'TDefaultTextRenderer';
function isGhostTNode(tnode) {
    return ((tnode.type === 'text' && (tnode.data === '' || tnode.data === ' ')) ||
        tnode.type === 'empty');
}
/**
 * A component to render any {@link TNode}.
 */
const TNodeRenderer = (0, react_1.memo)(function MemoizedTNodeRenderer(_a) {
    var { propsFromParent = { collapsedMarginTop: null } } = _a, props = __rest(_a, ["propsFromParent"]);
    const { tnode } = props;
    const sharedProps = (0, SharedPropsProvider_1.useSharedProps)();
    const renderRegistry = (0, RenderRegistryProvider_1.useRendererRegistry)();
    const TNodeChildrenRenderer = (0, TChildrenRendererContext_1.useTNodeChildrenRenderer)();
    const tnodeProps = Object.assign(Object.assign({}, props), { propsFromParent,
        TNodeChildrenRenderer,
        sharedProps });
    const renderer = tnode.type === 'block' || tnode.type === 'document'
        ? TDefaultBlockRenderer
        : tnode.type === 'text'
            ? TDefaultTextRenderer
            : tnode.type === 'phrasing'
                ? TDefaultPhrasingRenderer
                : renderEmptyContent_1.default;
    const { assembledProps, Renderer } = (0, useAssembledCommonProps_1.default)(tnodeProps, renderer);
    switch (tnode.type) {
        case 'empty':
            return (0, renderEmptyContent_1.default)(assembledProps);
        case 'text': {
            const InternalTextRenderer = renderRegistry.getInternalTextRenderer(props.tnode.tagName);
            if (InternalTextRenderer) {
                return react_1.default.createElement(InternalTextRenderer, tnodeProps);
            }
            if (tnodeProps.tnode.data === '' &&
                tnodeProps.sharedProps.enableExperimentalGhostLinesPrevention) {
                return null;
            }
            break;
        }
        case 'phrasing': {
            if (tnodeProps.sharedProps.bypassAnonymousTPhrasingNodes &&
                tnodeProps.tnode.tagName == null &&
                tnodeProps.tnode.children.length <= 1) {
                return react_1.default.createElement(TNodeChildrenRenderer, {
                    tnode: props.tnode
                });
            }
            if (tnodeProps.sharedProps.enableExperimentalGhostLinesPrevention &&
                tnodeProps.tnode.tagName == null &&
                tnodeProps.tnode.children.every(isGhostTNode)) {
                return null;
            }
            break;
        }
    }
    const renderFn = tnode.type === 'block' || tnode.type === 'document'
        ? renderBlockContent_1.default
        : renderTextualContent_1.default;
    return Renderer === null
        ? renderFn(assembledProps)
        : react_1.default.createElement(Renderer, assembledProps);
});
exports.default = TNodeRenderer;
