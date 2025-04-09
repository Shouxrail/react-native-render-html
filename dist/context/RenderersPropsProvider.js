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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRendererProps = useRendererProps;
exports.default = RenderersPropsProvider;
const react_1 = __importStar(require("react"));
const mergeDeepRight_1 = __importDefault(require("ramda/src/mergeDeepRight"));
const defaultRendererProps_1 = __importDefault(require("./defaultRendererProps"));
const useProfiler_1 = __importDefault(require("../hooks/useProfiler"));
const RenderersPropsContext = react_1.default.createContext(defaultRendererProps_1.default);
/**
 * Consume props from {@link RenderHTMLProps.renderersProps}.
 *
 * @param tagName - The name of the element.
 * @typeParam K - The type literal corresponding to the element name.
 * @returns props for this renderer.
 *
 * @public
 */
function useRendererProps(tagName) {
    const userProps = react_1.default.useContext(RenderersPropsContext);
    return userProps[tagName];
}
/**
 * @internal
 */
function RenderersPropsProvider(props) {
    const profile = (0, useProfiler_1.default)({ prop: 'renderersProps' });
    const mergedRenderersProps = (0, react_1.useMemo)(() => {
        typeof __DEV__ === 'boolean' && __DEV__ && profile();
        return (0, mergeDeepRight_1.default)(defaultRendererProps_1.default, props.renderersProps || {});
    }, [props.renderersProps, profile]);
    return react_1.default.createElement(RenderersPropsContext.Provider, { value: mergedRenderersProps }, props.children);
}
