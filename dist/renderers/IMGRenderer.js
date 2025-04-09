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
exports.useIMGElementProps = useIMGElementProps;
const react_1 = __importStar(require("react"));
const IMGElement_1 = __importDefault(require("../elements/IMGElement"));
const SharedPropsProvider_1 = require("../context/SharedPropsProvider");
const react_native_1 = require("react-native");
const useNormalizedUrl_1 = __importDefault(require("../hooks/useNormalizedUrl"));
const RenderersPropsProvider_1 = require("../context/RenderersPropsProvider");
const useContentWidth_1 = __importDefault(require("../hooks/useContentWidth"));
const getNativePropsForTNode_1 = __importDefault(require("../helpers/getNativePropsForTNode"));
/**
 * A hook to produce props consumable by {@link IMGElement} component
 * from custom renderer props.
 */
function useIMGElementProps(props) {
    const { tnode } = props;
    const contentWidth = (0, useContentWidth_1.default)();
    const { initialDimensions, enableExperimentalPercentWidth } = (0, RenderersPropsProvider_1.useRendererProps)('img');
    const computeImagesMaxWidth = (0, SharedPropsProvider_1.useComputeMaxWidthForTag)('img');
    const src = tnode.attributes.src || '';
    const source = { uri: (0, useNormalizedUrl_1.default)(src) };
    const _a = (0, getNativePropsForTNode_1.default)(props), { style: rawStyle } = _a, containerProps = __rest(_a, ["style"]);
    const style = (0, react_1.useMemo)(() => (rawStyle ? react_native_1.StyleSheet.flatten(rawStyle) : {}), [rawStyle]);
    return {
        contentWidth,
        containerProps,
        enableExperimentalPercentWidth,
        initialDimensions,
        source,
        style,
        testID: 'img',
        computeMaxWidth: computeImagesMaxWidth,
        alt: tnode.attributes.alt,
        altColor: tnode.styles.nativeTextFlow.color,
        width: tnode.attributes.width,
        height: tnode.attributes.height,
        objectFit: tnode.styles.webBlockRet.objectFit
    };
}
const IMGRenderer = (props) => {
    return react_1.default.createElement(IMGElement_1.default, useIMGElementProps(props));
};
exports.default = IMGRenderer;
