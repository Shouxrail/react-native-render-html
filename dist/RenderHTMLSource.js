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
exports.renderSourcePropTypes = void 0;
const equals_1 = __importDefault(require("ramda/src/equals"));
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const prop_types_1 = __importDefault(require("prop-types"));
const ttreeEventsContext_1 = __importDefault(require("./context/ttreeEventsContext"));
const isUriSource_1 = __importDefault(require("./helpers/isUriSource"));
const SourceLoaderUri_1 = __importDefault(require("./SourceLoaderUri"));
const SourceLoaderInline_1 = __importDefault(require("./SourceLoaderInline"));
const SourceLoaderDom_1 = __importDefault(require("./SourceLoaderDom"));
const debugMessages_1 = __importDefault(require("./debugMessages"));
const contentWidthContext_1 = __importDefault(require("./context/contentWidthContext"));
const isDomSource_1 = __importDefault(require("./helpers/isDomSource"));
const useProfiler_1 = __importDefault(require("./hooks/useProfiler"));
exports.renderSourcePropTypes = {
    source: prop_types_1.default.oneOfType([
        prop_types_1.default.shape({
            html: prop_types_1.default.string.isRequired,
            baseUrl: prop_types_1.default.string
        }),
        prop_types_1.default.shape({
            dom: prop_types_1.default.object.isRequired,
            baseUrl: prop_types_1.default.string
        }),
        prop_types_1.default.shape({
            uri: prop_types_1.default.string.isRequired,
            method: prop_types_1.default.string,
            body: prop_types_1.default.any,
            headers: prop_types_1.default.object
        })
    ]),
    onTTreeChange: prop_types_1.default.func,
    onHTMLLoaded: prop_types_1.default.func,
    onDocumentMetadataLoaded: prop_types_1.default.func,
    contentWidth: prop_types_1.default.number
};
function isEmptySource(source) {
    return (!source ||
        (typeof source.uri !== 'string' &&
            typeof source.html !== 'string' &&
            !source.dom));
}
function RawSourceLoader(_a) {
    var { source } = _a, props = __rest(_a, ["source"]);
    if (isEmptySource(source)) {
        /* istanbul ignore next */
        if (typeof __DEV__ === 'boolean' && __DEV__) {
            console.warn(debugMessages_1.default.noSource);
        }
        return null;
    }
    if ((0, isUriSource_1.default)(source)) {
        return react_1.default.createElement(SourceLoaderUri_1.default, Object.assign({ source }, props));
    }
    if ((0, isDomSource_1.default)(source)) {
        return react_1.default.createElement(SourceLoaderDom_1.default, Object.assign({ source }, props));
    }
    return react_1.default.createElement(SourceLoaderInline_1.default, Object.assign({ source }, props));
}
// check if for each key of two objects, the values are equal
function shallowEqual(prop1, prop2) {
    if (!(0, equals_1.default)(Object.keys(prop1), Object.keys(prop2))) {
        return false;
    }
    for (const key in prop1) {
        if (prop1[key] !== prop2[key]) {
            return false;
        }
    }
    return true;
}
/**
 * A React component to render HTML snippets.
 *
 * @remarks This component is useful when you have to load dozens of HTML
 * snippets with the same config. Performance is expected to improve in such
 * scenarios.
 *
 * @warning This component requires to have {@link TRenderEngineProvider}
 * and {@link RenderHTMLConfigProvider} as parents.
 */
const RenderHTMLSource = (0, react_1.memo)(function RenderHtmlSource(_a) {
    var { onDocumentMetadataLoaded, onTTreeChange, contentWidth } = _a, props = __rest(_a, ["onDocumentMetadataLoaded", "onTTreeChange", "contentWidth"]);
    const profile = (0, useProfiler_1.default)({
        prop: 'onDocumentMetadataLoaded or onTTreeChange'
    });
    const ttreeEvents = (0, react_1.useMemo)(() => {
        typeof __DEV__ === 'boolean' && __DEV__ && profile();
        return {
            onDocumentMetadataLoaded,
            onTTreeChange
        };
    }, [onDocumentMetadataLoaded, onTTreeChange, profile]);
    if (typeof __DEV__ === 'boolean' && __DEV__) {
        if (!(typeof contentWidth === 'number')) {
            console.warn(debugMessages_1.default.contentWidth);
        }
    }
    return (react_1.default.createElement(ttreeEventsContext_1.default.Provider, { value: ttreeEvents },
        react_1.default.createElement(contentWidthContext_1.default.Provider, { value: contentWidth || react_native_1.Dimensions.get('window').width }, react_1.default.createElement(RawSourceLoader, props))));
}, (_a, _b) => {
    var { source: prevSource } = _a, prev = __rest(_a, ["source"]);
    var currSource = _b.source, curr = __rest(_b, ["source"]);
    return shallowEqual(prevSource, currSource) && shallowEqual(prev, curr);
});
/**
 * @ignore
 */
RenderHTMLSource.propTypes = exports.renderSourcePropTypes;
exports.default = RenderHTMLSource;
