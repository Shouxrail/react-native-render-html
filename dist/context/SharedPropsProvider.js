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
exports.useSharedProps = useSharedProps;
exports.useDefaultContainerProps = useDefaultContainerProps;
exports.useComputeMaxWidthForTag = useComputeMaxWidthForTag;
exports.default = SharedPropsProvider;
const react_1 = __importStar(require("react"));
const defaultListStyleSpecs_1 = __importDefault(require("../elements/defaultListStyleSpecs"));
const selectSharedProps_1 = __importDefault(require("../helpers/selectSharedProps"));
const defaultSharedProps_1 = __importDefault(require("./defaultSharedProps"));
const SharedPropsContext = react_1.default.createContext(defaultSharedProps_1.default);
/**
 * Use shared props. See {@link RenderHTMLSharedProps}.
 *
 * @public
 */
function useSharedProps() {
    return react_1.default.useContext(SharedPropsContext);
}
/**
 * @internal
 */
function useDefaultContainerProps() {
    const sharedProps = useSharedProps();
    return {
        viewProps: Object.assign(Object.assign({}, defaultSharedProps_1.default.defaultViewProps), sharedProps.defaultViewProps),
        textProps: Object.assign(Object.assign({}, defaultSharedProps_1.default.defaultTextProps), sharedProps.defaultTextProps)
    };
}
/**
 * Compute max width for a given tag. Uses
 * {@link RenderHTMLProps.computeEmbeddedMaxWidth}
 * and {@link RenderHTMLProps.contentWidth} under the hood.
 *
 * @param tagName - The tag to target.
 *
 * @public
 */
function useComputeMaxWidthForTag(tagName) {
    const { computeEmbeddedMaxWidth } = useSharedProps();
    return (0, react_1.useCallback)((cw) => {
        return computeEmbeddedMaxWidth(cw, tagName);
    }, [computeEmbeddedMaxWidth, tagName]);
}
/**
 * @internal
 */
function SharedPropsProvider(props) {
    const memoizedSharedProps = (0, react_1.useMemo)(() => (Object.assign(Object.assign({}, (0, selectSharedProps_1.default)(props)), { customListStyleSpecs: Object.assign(Object.assign({}, defaultListStyleSpecs_1.default), props.customListStyleSpecs) })), 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    Object.values((0, selectSharedProps_1.default)(props)));
    return react_1.default.createElement(SharedPropsContext.Provider, { value: memoizedSharedProps }, props.children);
}
