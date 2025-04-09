"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = buildTREFromConfig;
const transient_render_engine_1 = __importDefault(require("@native-html/transient-render-engine"));
/**
 * Build a {@link TRenderEngine} instance from a configuration object.
 *
 * @remarks This utility can be useful to test and debug the TRE layer of your
 * application.
 *
 * @param props - The configuration from which a TRE should be built.
 */
function buildTREFromConfig(props) {
    const { allowedStyles, 
    // TODO fix upstream
    ignoredStyles = [], ignoredDomTags, ignoreDomNode, domVisitors, htmlParserOptions, baseStyle, classesStyles, tagsStyles, idsStyles, enableCSSInlineProcessing, enableUserAgentStyles, systemFonts = [], fallbackFonts = {}, customHTMLElementModels = {}, emSize, setMarkersForTNode, selectDomRoot, dangerouslyDisableHoisting, dangerouslyDisableWhitespaceCollapsing } = props;
    const customizeHTMLModels = Object.keys(customHTMLElementModels).length
        ? (defaultModels) => {
            return Object.assign(Object.assign({}, defaultModels), customHTMLElementModels);
        }
        : undefined;
    const fontMap = {};
    systemFonts.forEach((font) => {
        fontMap[font] = true;
    });
    const isFontSupported = (fontFamily) => {
        if (fallbackFonts[fontFamily]) {
            return fallbackFonts[fontFamily];
        }
        /* istanbul ignore next */
        return fontMap[fontFamily] || false;
    };
    return new transient_render_engine_1.default({
        customizeHTMLModels,
        cssProcessorConfig: {
            isFontSupported,
            inlinePropertiesBlacklist: ignoredStyles,
            inlinePropertiesWhitelist: allowedStyles,
            rootFontSize: emSize
        },
        htmlParserOptions: Object.assign({ decodeEntities: true }, htmlParserOptions),
        stylesConfig: {
            baseStyle,
            enableCSSInlineProcessing,
            enableUserAgentStyles,
            classesStyles,
            idsStyles,
            tagsStyles
        },
        ignoredDomTags,
        ignoreDomNode,
        domVisitors,
        setMarkersForTNode,
        selectDomRoot,
        dangerouslyDisableHoisting,
        dangerouslyDisableWhitespaceCollapsing
    });
}
