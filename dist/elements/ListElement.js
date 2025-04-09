"use strict";
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
exports.getMarkerBoxStyle = getMarkerBoxStyle;
exports.default = ListElement;
const react_native_1 = require("react-native");
const react_1 = __importDefault(require("react"));
const react_native_li_1 = require("@jsamr/react-native-li");
const TChildrenRendererContext_1 = require("../context/TChildrenRendererContext");
const constants_1 = require("../constants");
const pick_1 = __importDefault(require("ramda/src/pick"));
const ListStyleSpecsProvider_1 = require("../context/ListStyleSpecsProvider");
function getStartIndex(tnode) {
    const parsedIndex = tnode.attributes.start
        ? Number(tnode.attributes.start)
        : Number.NaN;
    return Number.isNaN(parsedIndex) ? 1 : parsedIndex;
}
const pickMarkerTextStyles = (0, pick_1.default)([
    'fontStyle',
    'fontSize',
    'fontWeight',
    'fontFamily',
    'fontVariant',
    'color',
    'lineHeight'
]);
function extractMarkerTextStyle(tnode) {
    return Object.assign({
        lineHeight: 14 * 1.3,
        fontSize: 14,
        color: constants_1.DEFAULT_TEXT_COLOR
    }, pickMarkerTextStyles(tnode.styles.nativeTextFlow));
}
function getMarkerBoxStyle(markerWidth, paddingValue) {
    const markerBoxWidth = typeof markerWidth === 'number'
        ? typeof paddingValue === 'number'
            ? Math.max(paddingValue, markerWidth)
            : markerWidth
        : paddingValue;
    return { width: markerBoxWidth };
}
const listStyleTypeFallbackRecord = {
    ol: 'decimal',
    ul: 'disc'
};
function ListElement(_a) {
    var _b, _c, _d, _e;
    var { tnode, TDefaultRenderer, listType, style, getFallbackListStyleTypeFromNestLevel, markerBoxStyle, markerTextStyle: providedMarkerTextStyle, enableExperimentalRtl = false, enableRemoveTopMarginIfNested = true, enableRemoveBottomMarginIfNested = true, enableDynamicMarkerBoxWidth = false } = _a, props = __rest(_a, ["tnode", "TDefaultRenderer", "listType", "style", "getFallbackListStyleTypeFromNestLevel", "markerBoxStyle", "markerTextStyle", "enableExperimentalRtl", "enableRemoveTopMarginIfNested", "enableRemoveBottomMarginIfNested", "enableDynamicMarkerBoxWidth"]);
    const listStyleSpecs = (0, ListStyleSpecsProvider_1.useListStyleSpecs)();
    const markers = tnode.markers;
    const nestLevel = listType === 'ol' ? markers.olNestLevel : markers.ulNestLevel;
    const TChildrenRenderer = (0, TChildrenRendererContext_1.useTChildrenRenderer)();
    const rtl = enableExperimentalRtl &&
        (style.direction === 'rtl' || markers.direction === 'rtl');
    const removeTopMarginStyle = enableRemoveTopMarginIfNested &&
        ((_b = tnode.parent) === null || _b === void 0 ? void 0 : _b.tagName) === 'li' &&
        tnode.nodeIndex === 0
        ? styles.zeroMarginTop
        : null;
    const removeBottomMarginStyle = enableRemoveBottomMarginIfNested &&
        ((_c = tnode.parent) === null || _c === void 0 ? void 0 : _c.tagName) === 'li' &&
        tnode.nodeIndex === ((_d = tnode.parent) === null || _d === void 0 ? void 0 : _d.children.length) - 1
        ? styles.zeroMarginBottom
        : null;
    const ownListType = tnode.styles.webTextFlow.listStyleType;
    const selectedListType = getFallbackListStyleTypeFromNestLevel(nestLevel) ||
        ownListType ||
        listStyleTypeFallbackRecord[listType];
    const listStyleType = ownListType || selectedListType;
    if (typeof __DEV__ === 'boolean' &&
        __DEV__ &&
        !(listStyleType in listStyleSpecs)) {
        if (listStyleType.match(/^("|')/)) {
            console.warn("This library doesn't support strings for list-style-type CSS properties.");
        }
        else {
            console.warn(`list-style-type "${listStyleType}" is not handled by react-native-render-html. ` +
                'You can easily provide support for this style via "customListStyleSpecs" prop.');
        }
    }
    const spec = listStyleType in listStyleSpecs
        ? listStyleSpecs[listStyleType]
        : listStyleSpecs[selectedListType];
    const counterRenderer = spec.counterStyleRenderer;
    const startIndex = getStartIndex(tnode);
    const markerTextStyle = typeof providedMarkerTextStyle === 'object' && providedMarkerTextStyle
        ? Object.assign(Object.assign({}, extractMarkerTextStyle(tnode)), providedMarkerTextStyle) : extractMarkerTextStyle(tnode);
    const itemProps = (0, react_native_li_1.useMarkedList)({
        counterRenderer,
        startIndex,
        markerTextStyle,
        markerBoxStyle,
        rtlLineReversed: rtl,
        rtlMarkerReversed: rtl,
        length: tnode.children.length,
        dynamicMarkerBoxWidth: enableDynamicMarkerBoxWidth,
        renderMarker: spec.renderMarker
    });
    const markerWidth = itemProps.markerTextWidth;
    const fixedPaddingRule = rtl
        ? 'paddingRight'
        : 'paddingLeft';
    // Fallback to padding-left value on RTL mode
    const paddingValue = (_e = style[fixedPaddingRule]) !== null && _e !== void 0 ? _e : style.paddingLeft;
    const markerBoxWidthStyle = getMarkerBoxStyle(markerWidth, paddingValue);
    const renderChild = ({ childElement, key, index }) => (react_1.default.createElement(react_native_li_1.MarkedListItem, Object.assign({ key: key, index: index }, itemProps, { markerBoxStyle: [itemProps.markerBoxStyle, markerBoxWidthStyle], markerTextStyle: itemProps.markerTextStyle, enableMarkerClipping: true, style: itemProps.style }),
        react_1.default.createElement(react_native_1.View, { style: styles.shrink }, childElement)));
    const dynamicPaddingStyle = {
        position: 'relative',
        [fixedPaddingRule]: 0
    };
    return (react_1.default.createElement(TDefaultRenderer, Object.assign({ tnode: tnode, style: [
            style,
            removeTopMarginStyle,
            removeBottomMarginStyle,
            dynamicPaddingStyle
        ] }, props),
        react_1.default.createElement(TChildrenRenderer, { tchildren: tnode.children, renderChild: renderChild })));
}
const styles = react_native_1.StyleSheet.create({
    zeroMarginTop: { marginTop: 0 },
    zeroMarginBottom: { marginBottom: 0 },
    shrink: { flexShrink: 1 }
});
