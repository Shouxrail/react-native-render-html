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
exports.useListStyleSpecs = useListStyleSpecs;
exports.default = ListStyleSpecsProvider;
const ramda_1 = require("ramda");
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const defaultListStyleSpecs_1 = __importDefault(require("../elements/defaultListStyleSpecs"));
const SharedPropsProvider_1 = require("./SharedPropsProvider");
const listStyleSpecsContext = (0, react_1.createContext)(defaultListStyleSpecs_1.default);
function useListStyleSpecs() {
    return (0, react_1.useContext)(listStyleSpecsContext);
}
function createSymbolicMarkerRenderer({ Component, counterStyleRenderer }) {
    const prefix = counterStyleRenderer.renderPrefix();
    const suffix = counterStyleRenderer.renderSuffix();
    return ({ style, markerTextStyle, counterIndex, rtlMarkerReversed }) => {
        return (react_1.default.createElement(react_native_1.View, { style: [
                style,
                {
                    flexDirection: rtlMarkerReversed ? 'row-reverse' : 'row',
                    justifyContent: 'flex-end'
                }
            ] },
            !!prefix && react_1.default.createElement(react_native_1.Text, { style: markerTextStyle }, prefix),
            react_1.default.createElement(Component, Object.assign(Object.assign({}, markerTextStyle), { index: counterIndex })),
            !!suffix && react_1.default.createElement(react_native_1.Text, { style: markerTextStyle }, suffix)));
    };
}
const makeMarkerRenderers = (0, ramda_1.mapObjIndexed)((value) => {
    if (value.type === 'unitary') {
        return Object.assign(Object.assign({}, value), { renderMarker: createSymbolicMarkerRenderer(value) });
    }
    return value;
});
function ListStyleSpecsProvider({ children }) {
    const { customListStyleSpecs } = (0, SharedPropsProvider_1.useSharedProps)();
    const mergedListStyleSpecs = (0, react_1.useMemo)(() => {
        return makeMarkerRenderers(customListStyleSpecs != null
            ? Object.assign(Object.assign({}, defaultListStyleSpecs_1.default), customListStyleSpecs) : defaultListStyleSpecs_1.default);
    }, [customListStyleSpecs]);
    return (react_1.default.createElement(listStyleSpecsContext.Provider, { value: mergedListStyleSpecs }, children));
}
