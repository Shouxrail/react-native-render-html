"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultTRenderEngineProviderProps = exports.defaultFallbackFonts = exports.tRenderEngineProviderPropTypes = void 0;
exports.useAmbientTRenderEngine = useAmbientTRenderEngine;
exports.default = TRenderEngineProvider;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const prop_types_1 = __importDefault(require("prop-types"));
const useTRenderEngine_1 = __importDefault(require("./hooks/useTRenderEngine"));
const defaultSystemFonts_1 = __importDefault(require("./defaultSystemFonts"));
const defaultTRenderEngine = {};
const TRenderEngineContext = react_1.default.createContext(defaultTRenderEngine);
exports.tRenderEngineProviderPropTypes = {
    customHTMLElementModels: prop_types_1.default.object.isRequired,
    enableCSSInlineProcessing: prop_types_1.default.bool,
    enableUserAgentStyles: prop_types_1.default.bool,
    idsStyles: prop_types_1.default.object,
    ignoredDomTags: prop_types_1.default.array,
    ignoreDomNode: prop_types_1.default.func,
    domVisitors: prop_types_1.default.object,
    ignoredStyles: prop_types_1.default.array.isRequired,
    allowedStyles: prop_types_1.default.array,
    htmlParserOptions: prop_types_1.default.object,
    tagsStyles: prop_types_1.default.object,
    classesStyles: prop_types_1.default.object,
    emSize: prop_types_1.default.number.isRequired,
    baseStyle: prop_types_1.default.object,
    systemFonts: prop_types_1.default.arrayOf(prop_types_1.default.string),
    fallbackFonts: prop_types_1.default.shape({
        serif: prop_types_1.default.string,
        'sans-serif': prop_types_1.default.string,
        monospace: prop_types_1.default.string
    }),
    setMarkersForTNode: prop_types_1.default.func,
    dangerouslyDisableHoisting: prop_types_1.default.bool,
    dangerouslyDisableWhitespaceCollapsing: prop_types_1.default.bool,
    selectDomRoot: prop_types_1.default.func
};
exports.defaultFallbackFonts = {
    'sans-serif': react_native_1.Platform.select({ ios: 'system', default: 'sans-serif' }),
    monospace: react_native_1.Platform.select({ ios: 'Menlo', default: 'monospace' }),
    serif: react_native_1.Platform.select({ ios: 'Times New Roman', default: 'serif' })
};
exports.defaultTRenderEngineProviderProps = {
    htmlParserOptions: {
        decodeEntities: true
    },
    emSize: 14,
    ignoredDomTags: [],
    ignoredStyles: [],
    baseStyle: { fontSize: 14 },
    tagsStyles: {},
    classesStyles: {},
    enableUserAgentStyles: true,
    enableCSSInlineProcessing: true,
    customHTMLElementModels: {},
    fallbackFonts: exports.defaultFallbackFonts,
    systemFonts: defaultSystemFonts_1.default
};
/**
 * Use the ambient transient render engine.
 */
function useAmbientTRenderEngine() {
    const engine = react_1.default.useContext(TRenderEngineContext);
    if (typeof __DEV__ === 'boolean' && __DEV__ && engine === defaultTRenderEngine) {
        console.error('TRenderEngineProvider is missing in the render tree.');
    }
    return engine;
}
/**
 * Share a TRenderEngine instance via React context.
 */
function TRenderEngineProvider({ children, htmlParserOptions = { decodeEntities: true }, emSize = 14, ignoredDomTags = [], ignoredStyles = [], baseStyle = { fontSize: 14 }, tagsStyles = {}, classesStyles = {}, enableUserAgentStyles = true, enableCSSInlineProcessing = true, customHTMLElementModels = {}, fallbackFonts = exports.defaultFallbackFonts, systemFonts = defaultSystemFonts_1.default, idsStyles, ignoreDomNode, domVisitors, allowedStyles, setMarkersForTNode, dangerouslyDisableHoisting, dangerouslyDisableWhitespaceCollapsing, selectDomRoot }) {
    const engine = (0, useTRenderEngine_1.default)({
        htmlParserOptions,
        emSize,
        ignoredDomTags,
        ignoredStyles,
        baseStyle,
        tagsStyles,
        classesStyles,
        enableUserAgentStyles,
        enableCSSInlineProcessing,
        customHTMLElementModels,
        fallbackFonts,
        systemFonts,
        idsStyles,
        ignoreDomNode,
        domVisitors,
        allowedStyles,
        setMarkersForTNode,
        dangerouslyDisableHoisting,
        dangerouslyDisableWhitespaceCollapsing,
        selectDomRoot
    });
    return (react_1.default.createElement(TRenderEngineContext.Provider, { value: engine }, children));
}
