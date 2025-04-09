"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultRenderError = defaultRenderError;
exports.defaultRenderLoading = defaultRenderLoading;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const styles = react_native_1.StyleSheet.create({
    alignCenter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    errorText: {
        fontStyle: 'italic',
        fontSize: 16
    }
});
function defaultRenderError(source) {
    return (react_1.default.createElement(react_native_1.View, { testID: "loader-error", style: styles.alignCenter },
        react_1.default.createElement(react_native_1.Text, { style: styles.errorText },
            "Failed to load HTML from ",
            source.uri)));
}
function defaultRenderLoading() {
    return (react_1.default.createElement(react_native_1.View, { testID: "loader-loading", style: styles.alignCenter },
        react_1.default.createElement(react_native_1.ActivityIndicator, null)));
}
const sourceLoaderContext = react_1.default.createContext({
    remoteErrorView: defaultRenderError,
    remoteLoadingView: defaultRenderLoading
});
exports.default = sourceLoaderContext;
