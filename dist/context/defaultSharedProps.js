"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
function WebViewPlaceholder() {
    /* istanbul ignore else */
    if (typeof __DEV__ === 'boolean' && __DEV__) {
        console.warn('One of your renderers is attempting to use WebView component, which has not been ' +
            "provided as a prop to the RenderHtml component. As a consequence, the element won't be rendered.");
    }
    return null;
}
const defaultSharedProps = {
    bypassAnonymousTPhrasingNodes: true,
    debug: false,
    defaultTextProps: {
        selectable: false,
        allowFontScaling: true
    },
    defaultViewProps: {},
    enableExperimentalBRCollapsing: false,
    enableExperimentalGhostLinesPrevention: false,
    enableExperimentalMarginCollapsing: false,
    computeEmbeddedMaxWidth: (contentWidth) => contentWidth,
    WebView: WebViewPlaceholder,
    defaultWebViewProps: {},
    pressableHightlightColor: constants_1.DEFAULT_PRESSABLE_RIPPLE_COLOR,
    provideEmbeddedHeaders: undefined,
    GenericPressable: undefined,
    customListStyleSpecs: undefined
};
exports.default = defaultSharedProps;
