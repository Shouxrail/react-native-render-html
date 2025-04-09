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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useIMGElementProps = exports.IMGElementContentAlt = exports.IMGElementContentSuccess = exports.IMGElementContentLoading = exports.IMGElementContentError = exports.IMGElementContainer = exports.IMGElement = exports.useIMGElementStateWithCache = exports.useIMGElementState = exports.defaultListStyleSpecs = exports.defaultSystemFonts = exports.domNodeToHTMLString = exports.useContentWidth = exports.useDocumentMetadata = exports.useRendererProps = exports.useSharedProps = exports.useComputeMaxWidthForTag = exports.buildTREFromConfig = exports.splitBoxModelStyle = exports.collapseTopMarginForChild = exports.getNativePropsForTNode = exports.useNormalizedUrl = exports.useInternalRenderer = exports.RenderHTMLSource = exports.RenderHTMLConfigProvider = exports.useAmbientTRenderEngine = exports.defaultFallbackFonts = exports.TRenderEngineProvider = exports.TNodeRenderer = exports.useTNodeChildrenProps = exports.TNodeChildrenRenderer = exports.TChildrenRenderer = exports.RenderHTML = exports.TRenderEngine = exports.HTMLElementModel = exports.HTMLContentModel = exports.NodeWithChildren = exports.Text = exports.Node = exports.Element = exports.Document = exports.isDomText = exports.isDomElement = exports.defaultHTMLElementModels = void 0;
const RenderHTML_1 = __importDefault(require("./RenderHTML"));
exports.RenderHTML = RenderHTML_1.default;
var transient_render_engine_1 = require("@native-html/transient-render-engine");
Object.defineProperty(exports, "defaultHTMLElementModels", { enumerable: true, get: function () { return transient_render_engine_1.defaultHTMLElementModels; } });
Object.defineProperty(exports, "isDomElement", { enumerable: true, get: function () { return transient_render_engine_1.isDomElement; } });
Object.defineProperty(exports, "isDomText", { enumerable: true, get: function () { return transient_render_engine_1.isDomText; } });
Object.defineProperty(exports, "Document", { enumerable: true, get: function () { return transient_render_engine_1.Document; } });
Object.defineProperty(exports, "Element", { enumerable: true, get: function () { return transient_render_engine_1.Element; } });
Object.defineProperty(exports, "Node", { enumerable: true, get: function () { return transient_render_engine_1.Node; } });
Object.defineProperty(exports, "Text", { enumerable: true, get: function () { return transient_render_engine_1.Text; } });
Object.defineProperty(exports, "NodeWithChildren", { enumerable: true, get: function () { return transient_render_engine_1.NodeWithChildren; } });
Object.defineProperty(exports, "HTMLContentModel", { enumerable: true, get: function () { return transient_render_engine_1.HTMLContentModel; } });
Object.defineProperty(exports, "HTMLElementModel", { enumerable: true, get: function () { return transient_render_engine_1.HTMLElementModel; } });
Object.defineProperty(exports, "TRenderEngine", { enumerable: true, get: function () { return transient_render_engine_1.TRenderEngine; } });
__exportStar(require("./shared-types"), exports);
__exportStar(require("./render/render-types"), exports);
exports.default = RenderHTML_1.default;
var TChildrenRenderer_1 = require("./TChildrenRenderer");
Object.defineProperty(exports, "TChildrenRenderer", { enumerable: true, get: function () { return __importDefault(TChildrenRenderer_1).default; } });
var TNodeChildrenRenderer_1 = require("./TNodeChildrenRenderer");
Object.defineProperty(exports, "TNodeChildrenRenderer", { enumerable: true, get: function () { return __importDefault(TNodeChildrenRenderer_1).default; } });
Object.defineProperty(exports, "useTNodeChildrenProps", { enumerable: true, get: function () { return TNodeChildrenRenderer_1.useTNodeChildrenProps; } });
var TNodeRenderer_1 = require("./TNodeRenderer");
Object.defineProperty(exports, "TNodeRenderer", { enumerable: true, get: function () { return __importDefault(TNodeRenderer_1).default; } });
var TRenderEngineProvider_1 = require("./TRenderEngineProvider");
Object.defineProperty(exports, "TRenderEngineProvider", { enumerable: true, get: function () { return __importDefault(TRenderEngineProvider_1).default; } });
Object.defineProperty(exports, "defaultFallbackFonts", { enumerable: true, get: function () { return TRenderEngineProvider_1.defaultFallbackFonts; } });
Object.defineProperty(exports, "useAmbientTRenderEngine", { enumerable: true, get: function () { return TRenderEngineProvider_1.useAmbientTRenderEngine; } });
var RenderHTMLConfigProvider_1 = require("./RenderHTMLConfigProvider");
Object.defineProperty(exports, "RenderHTMLConfigProvider", { enumerable: true, get: function () { return __importDefault(RenderHTMLConfigProvider_1).default; } });
var RenderHTMLSource_1 = require("./RenderHTMLSource");
Object.defineProperty(exports, "RenderHTMLSource", { enumerable: true, get: function () { return __importDefault(RenderHTMLSource_1).default; } });
var useInternalRenderer_1 = require("./hooks/useInternalRenderer");
Object.defineProperty(exports, "useInternalRenderer", { enumerable: true, get: function () { return __importDefault(useInternalRenderer_1).default; } });
var useNormalizedUrl_1 = require("./hooks/useNormalizedUrl");
Object.defineProperty(exports, "useNormalizedUrl", { enumerable: true, get: function () { return __importDefault(useNormalizedUrl_1).default; } });
var getNativePropsForTNode_1 = require("./helpers/getNativePropsForTNode");
Object.defineProperty(exports, "getNativePropsForTNode", { enumerable: true, get: function () { return __importDefault(getNativePropsForTNode_1).default; } });
var collapseTopMarginForChild_1 = require("./helpers/collapseTopMarginForChild");
Object.defineProperty(exports, "collapseTopMarginForChild", { enumerable: true, get: function () { return __importDefault(collapseTopMarginForChild_1).default; } });
// HELPERS
var splitBoxModelStyle_1 = require("./helpers/splitBoxModelStyle");
Object.defineProperty(exports, "splitBoxModelStyle", { enumerable: true, get: function () { return __importDefault(splitBoxModelStyle_1).default; } });
var buildTREFromConfig_1 = require("./helpers/buildTREFromConfig");
Object.defineProperty(exports, "buildTREFromConfig", { enumerable: true, get: function () { return __importDefault(buildTREFromConfig_1).default; } });
// HOOKS
var SharedPropsProvider_1 = require("./context/SharedPropsProvider");
Object.defineProperty(exports, "useComputeMaxWidthForTag", { enumerable: true, get: function () { return SharedPropsProvider_1.useComputeMaxWidthForTag; } });
Object.defineProperty(exports, "useSharedProps", { enumerable: true, get: function () { return SharedPropsProvider_1.useSharedProps; } });
var RenderersPropsProvider_1 = require("./context/RenderersPropsProvider");
Object.defineProperty(exports, "useRendererProps", { enumerable: true, get: function () { return RenderersPropsProvider_1.useRendererProps; } });
var DocumentMetadataProvider_1 = require("./context/DocumentMetadataProvider");
Object.defineProperty(exports, "useDocumentMetadata", { enumerable: true, get: function () { return DocumentMetadataProvider_1.useDocumentMetadata; } });
var useContentWidth_1 = require("./hooks/useContentWidth");
Object.defineProperty(exports, "useContentWidth", { enumerable: true, get: function () { return __importDefault(useContentWidth_1).default; } });
var domNodeToHTMLString_1 = require("./helpers/domNodeToHTMLString");
Object.defineProperty(exports, "domNodeToHTMLString", { enumerable: true, get: function () { return __importDefault(domNodeToHTMLString_1).default; } });
// DEFAULTS
var defaultSystemFonts_1 = require("./defaultSystemFonts");
Object.defineProperty(exports, "defaultSystemFonts", { enumerable: true, get: function () { return __importDefault(defaultSystemFonts_1).default; } });
var defaultListStyleSpecs_1 = require("./elements/defaultListStyleSpecs");
Object.defineProperty(exports, "defaultListStyleSpecs", { enumerable: true, get: function () { return __importDefault(defaultListStyleSpecs_1).default; } });
// IMG
var useIMGElementState_1 = require("./elements/useIMGElementState");
Object.defineProperty(exports, "useIMGElementState", { enumerable: true, get: function () { return __importDefault(useIMGElementState_1).default; } });
var useIMGElementStateWithCache_1 = require("./elements/useIMGElementStateWithCache");
Object.defineProperty(exports, "useIMGElementStateWithCache", { enumerable: true, get: function () { return __importDefault(useIMGElementStateWithCache_1).default; } });
var IMGElement_1 = require("./elements/IMGElement");
Object.defineProperty(exports, "IMGElement", { enumerable: true, get: function () { return __importDefault(IMGElement_1).default; } });
var IMGElementContainer_1 = require("./elements/IMGElementContainer");
Object.defineProperty(exports, "IMGElementContainer", { enumerable: true, get: function () { return __importDefault(IMGElementContainer_1).default; } });
var IMGElementContentError_1 = require("./elements/IMGElementContentError");
Object.defineProperty(exports, "IMGElementContentError", { enumerable: true, get: function () { return __importDefault(IMGElementContentError_1).default; } });
var IMGElementContentLoading_1 = require("./elements/IMGElementContentLoading");
Object.defineProperty(exports, "IMGElementContentLoading", { enumerable: true, get: function () { return __importDefault(IMGElementContentLoading_1).default; } });
var IMGElementContentSuccess_1 = require("./elements/IMGElementContentSuccess");
Object.defineProperty(exports, "IMGElementContentSuccess", { enumerable: true, get: function () { return __importDefault(IMGElementContentSuccess_1).default; } });
var IMGElementContentAlt_1 = require("./elements/IMGElementContentAlt");
Object.defineProperty(exports, "IMGElementContentAlt", { enumerable: true, get: function () { return __importDefault(IMGElementContentAlt_1).default; } });
__exportStar(require("./elements/img-types"), exports);
var IMGRenderer_1 = require("./renderers/IMGRenderer");
Object.defineProperty(exports, "useIMGElementProps", { enumerable: true, get: function () { return IMGRenderer_1.useIMGElementProps; } });
