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
exports.renderHTMLConfigPropTypes = void 0;
exports.default = RenderHTMLConfigProvider;
const react_1 = __importStar(require("react"));
const prop_types_1 = __importDefault(require("prop-types"));
const RenderersPropsProvider_1 = __importDefault(require("./context/RenderersPropsProvider"));
const SharedPropsProvider_1 = __importDefault(require("./context/SharedPropsProvider"));
const TChildrenRendererContext_1 = __importDefault(require("./context/TChildrenRendererContext"));
const TNodeChildrenRenderer_1 = __importDefault(require("./TNodeChildrenRenderer"));
const TChildrenRenderer_1 = __importDefault(require("./TChildrenRenderer"));
const sourceLoaderContext_1 = __importStar(require("./context/sourceLoaderContext"));
const RenderRegistryProvider_1 = __importDefault(require("./context/RenderRegistryProvider"));
const TRenderEngineProvider_1 = require("./TRenderEngineProvider");
const useProfiler_1 = __importDefault(require("./hooks/useProfiler"));
const ListStyleSpecsProvider_1 = __importDefault(require("./context/ListStyleSpecsProvider"));
const childrenRendererContext = {
    TChildrenRenderer: TChildrenRenderer_1.default,
    TNodeChildrenRenderer: TNodeChildrenRenderer_1.default
};
exports.renderHTMLConfigPropTypes = {
    bypassAnonymousTPhrasingNodes: prop_types_1.default.bool,
    defaultTextProps: prop_types_1.default.object,
    defaultViewProps: prop_types_1.default.object,
    enableExperimentalBRCollapsing: prop_types_1.default.bool,
    enableExperimentalGhostLinesPrevention: prop_types_1.default.bool,
    enableExperimentalMarginCollapsing: prop_types_1.default.bool,
    remoteErrorView: prop_types_1.default.func,
    remoteLoadingView: prop_types_1.default.func,
    debug: prop_types_1.default.bool,
    computeEmbeddedMaxWidth: prop_types_1.default.func,
    renderersProps: prop_types_1.default.object,
    WebView: prop_types_1.default.any,
    GenericPressable: prop_types_1.default.any,
    defaultWebViewProps: prop_types_1.default.object,
    pressableHightlightColor: prop_types_1.default.string,
    customListStyleSpecs: prop_types_1.default.object,
    renderers: prop_types_1.default.object,
    provideEmbeddedHeaders: prop_types_1.default.func
};
/**
 * A component to provide configuration for {@link RenderHTMLSource}
 * descendants, to be used in conjunction with {@link TRenderEngineProvider}.
 */
function RenderHTMLConfigProvider(props) {
    const { remoteErrorView, remoteLoadingView, renderersProps, children, renderers } = props, sharedProps = __rest(props, ["remoteErrorView", "remoteLoadingView", "renderersProps", "children", "renderers"]);
    const engine = (0, TRenderEngineProvider_1.useAmbientTRenderEngine)();
    const profile = (0, useProfiler_1.default)({ prop: 'remoteErrorView or remoteLoadingView' });
    const sourceLoaderConfig = (0, react_1.useMemo)(() => {
        typeof __DEV__ === 'boolean' && __DEV__ && profile();
        return {
            remoteErrorView: remoteErrorView || sourceLoaderContext_1.defaultRenderError,
            remoteLoadingView: remoteLoadingView || sourceLoaderContext_1.defaultRenderLoading
        };
    }, [remoteErrorView, remoteLoadingView, profile]);
    return (react_1.default.createElement(RenderRegistryProvider_1.default, { renderers: renderers, elementModels: engine.getHTMLElementsModels() },
        react_1.default.createElement(SharedPropsProvider_1.default, Object.assign({}, sharedProps),
            react_1.default.createElement(ListStyleSpecsProvider_1.default, null,
                react_1.default.createElement(RenderersPropsProvider_1.default, { renderersProps: renderersProps },
                    react_1.default.createElement(TChildrenRendererContext_1.default.Provider, { value: childrenRendererContext },
                        react_1.default.createElement(sourceLoaderContext_1.default.Provider, { value: sourceLoaderConfig }, children)))))));
}
/**
 * @ignore
 */
RenderHTMLConfigProvider.propTypes = exports.renderHTMLConfigPropTypes;
