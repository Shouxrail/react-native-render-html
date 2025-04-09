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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SourceLoaderUri;
const react_1 = __importStar(require("react"));
const RenderTTree_1 = __importDefault(require("./RenderTTree"));
const sourceLoaderContext_1 = __importDefault(require("./context/sourceLoaderContext"));
const ERROR_STATE = {
    error: true,
    resolvedHTML: null
};
function loadHTMLResource(uri_1, _a) {
    return __awaiter(this, arguments, void 0, function* (uri, { body, headers, method }) {
        const response = yield fetch(uri, {
            body,
            headers,
            method
        });
        if (response.ok) {
            const html = yield response.text();
            return {
                resolvedHTML: html,
                error: false
            };
        }
        return ERROR_STATE;
    });
}
function useUriSourceLoader({ source, onHTMLLoaded }) {
    const [loadState, setState] = (0, react_1.useState)({
        error: false,
        resolvedHTML: null
    });
    const { error } = loadState;
    // Effect to reload on uri changes
    (0, react_1.useEffect)(() => {
        let cancelled = false;
        if (!error) {
            setState({ error: false, resolvedHTML: null });
            loadHTMLResource(source.uri, {
                body: source.body,
                headers: source.headers,
                method: source.method
            })
                .then((state) => {
                !cancelled && setState(state);
            })
                .catch(() => {
                !cancelled && setState(ERROR_STATE);
            });
        }
        return () => {
            cancelled = true;
        };
    }, [error, source.uri, source.body, source.headers, source.method]);
    (0, react_1.useEffect)(() => {
        loadState.resolvedHTML && (onHTMLLoaded === null || onHTMLLoaded === void 0 ? void 0 : onHTMLLoaded.call(null, loadState.resolvedHTML));
    }, [loadState.resolvedHTML, onHTMLLoaded]);
    return loadState;
}
function SourceLoaderUri(props) {
    const { remoteErrorView, remoteLoadingView } = (0, react_1.useContext)(sourceLoaderContext_1.default);
    const { resolvedHTML, error } = useUriSourceLoader(props);
    if (error) {
        return remoteErrorView.call(null, props.source);
    }
    if (resolvedHTML === null) {
        return remoteLoadingView.call(null, props.source);
    }
    return react_1.default.createElement(RenderTTree_1.default, {
        document: resolvedHTML,
        baseUrl: props.source.uri
    });
}
