"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useIMGNormalizedSource;
const react_1 = require("react");
const SharedPropsProvider_1 = require("../context/SharedPropsProvider");
function useIMGNormalizedSource({ source, specifiedDimensions }) {
    const cachedDimensions = (0, react_1.useRef)(specifiedDimensions);
    const { provideEmbeddedHeaders } = (0, SharedPropsProvider_1.useSharedProps)();
    return (0, react_1.useMemo)(() => {
        var _a, _b;
        if (source.uri && typeof provideEmbeddedHeaders === 'function') {
            const headers = provideEmbeddedHeaders(source.uri, 'img', {
                printWidth: ((_a = cachedDimensions.current) === null || _a === void 0 ? void 0 : _a.width) || undefined,
                printHeight: ((_b = cachedDimensions.current) === null || _b === void 0 ? void 0 : _b.height) || undefined
            });
            if (headers) {
                return Object.assign({ headers }, source);
            }
        }
        return source;
    }, [provideEmbeddedHeaders, source]);
}
