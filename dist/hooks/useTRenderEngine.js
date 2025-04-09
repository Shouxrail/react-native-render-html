"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useTRenderEngine;
const react_1 = require("react");
const buildTREFromConfig_1 = __importDefault(require("../helpers/buildTREFromConfig"));
const useProfiler_1 = __importDefault(require("./useProfiler"));
/**
 * @internal
 */
function useTRenderEngine({ allowedStyles, baseStyle, classesStyles, customHTMLElementModels, dangerouslyDisableHoisting, dangerouslyDisableWhitespaceCollapsing, domVisitors, emSize, enableCSSInlineProcessing, enableUserAgentStyles, fallbackFonts, htmlParserOptions, idsStyles, ignoreDomNode, ignoredDomTags, ignoredStyles, selectDomRoot, setMarkersForTNode, systemFonts, tagsStyles }) {
    const profile = (0, useProfiler_1.default)({ name: 'TRenderEngineProvider' });
    return (0, react_1.useMemo)(() => {
        typeof __DEV__ === 'boolean' && __DEV__ && profile();
        return (0, buildTREFromConfig_1.default)({
            allowedStyles,
            baseStyle,
            classesStyles,
            customHTMLElementModels,
            dangerouslyDisableHoisting,
            dangerouslyDisableWhitespaceCollapsing,
            domVisitors,
            emSize,
            enableCSSInlineProcessing,
            enableUserAgentStyles,
            fallbackFonts,
            htmlParserOptions,
            idsStyles,
            ignoreDomNode,
            ignoredDomTags,
            ignoredStyles,
            selectDomRoot,
            setMarkersForTNode,
            systemFonts,
            tagsStyles
        });
    }, [
        profile,
        allowedStyles,
        baseStyle,
        classesStyles,
        customHTMLElementModels,
        dangerouslyDisableHoisting,
        dangerouslyDisableWhitespaceCollapsing,
        domVisitors,
        emSize,
        enableCSSInlineProcessing,
        enableUserAgentStyles,
        fallbackFonts,
        htmlParserOptions,
        idsStyles,
        ignoreDomNode,
        ignoredDomTags,
        ignoredStyles,
        selectDomRoot,
        setMarkersForTNode,
        systemFonts,
        tagsStyles
    ]);
}
